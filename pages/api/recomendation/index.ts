import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { calculateMaxVotes } from "../../../utils";

export default async function getRecomendation(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { source, recomended, provider, genre, region, gte = 6 } = req.query;
  const { BASE_URL, TMDB_API_KEY } = process.env;
  const { MIN, MAX } = calculateMaxVotes({ source, genre });
  const countGte = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

  try {
    const appendToResponse = `similar,watch/providers,${
      source === "tv" ? "content_ratings" : "release_dates"
    }`;
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === "BR" ? "pt-BR" : "es-AR",
      api_key: apiKey || "",
      append_to_response: appendToResponse,
    };

    const providerToRequest =
      provider && provider !== "0"
        ? provider.toString()
        : "119|619|531|384|300|337|8";
    const genreToRequest = genre && genre !== "0" ? genre.toString() : "";
    let discoverObj = {
      ...baseObj,
      sort_by: "vote_average.desc",
      "vote_count.gte": countGte.toString(),
      watch_region: region?.toString() ?? "AR",
      with_watch_providers: providerToRequest,
      include_adult: "false",
      with_genres: genreToRequest,
      "vote_average.gte": gte.toString(),
    };
    const alreadyReco = (recomended as string).split("|");
    const discoverQueryParams = new URLSearchParams(discoverObj);
    const baseQueryParams = new URLSearchParams(baseObj);

    const initialRequest = async (params: any) => {
      const { data: firstData } = await axios.get(
        `${BASE_URL}/discover/${source}?${params}`
      );

      const { results: firstresponse } = firstData || {};

      firstresponse.totalPages = firstData.total_pages;

      return firstresponse;
    };

    let firstresponse = await initialRequest(discoverQueryParams);

    if (!firstresponse.length) {
      discoverObj = {
        ...discoverObj,
        "vote_count.gte": "5",
      };

      const updatedQueryParams = new URLSearchParams(discoverObj);

      firstresponse = await initialRequest(updatedQueryParams);
    }

    const { totalPages } = firstresponse;

    const pageRandom = Math.floor(Math.random() * (totalPages - 2) + 1) || "1";
    const newObj = new URLSearchParams({
      ...discoverObj,
      page: pageRandom.toString(),
    });
    const { data } = await axios.get(
      `${BASE_URL}/discover/${source}?${newObj}`
    );
    const { results } = data || {};
    let providerResponse: any = null;
    const notRepeatResult = results.filter(
      (r: any) => !alreadyReco.includes(r.id.toString())
    );

    if (!notRepeatResult.length)
      res.status(404).json({
        noResult: "No encontramos mas contenido para tus filtros aplicados",
        search: countGte,
        type: "warning",
      });

    const getContent = async (elements: any) => {
      const indexRandom =
        Math.floor(Math.random() * (elements.length - 2) + 1) || 0;
      const { id: firstId } = elements[indexRandom] || {};
      let id = firstId;
      let others = elements;

      if (alreadyReco.includes(firstId.toString())) {
        others = elements.filter((elem: any) => elem.id !== id);
        const { id: newId } = others[indexRandom] || {};

        id = newId;
      }
      const firstElement = others[indexRandom];
      const { data: newData } = await axios.get(
        `${BASE_URL}/${source}/${id}?${baseQueryParams}`
      );
      const currentIndex = region?.toString() ?? "AR";

      if (newData && !alreadyReco.includes(id.toString())) {
        const firstWatchProvider = newData["watch/providers"]?.results;
        const similars = newData.similar.results;

        let certification = "";

        if (source === "tv") {
          const contentRatings = newData.content_ratings.results;

          const currentRegionRating = contentRatings.find(
            (rating: any) => rating.iso_3166_1 === currentIndex
          )?.rating;
          const esRating = contentRatings.find(
            (rating: any) => rating.iso_3166_1 === "ES"
          )?.rating;
          const gbRating = contentRatings.find(
            (rating: any) => rating.iso_3166_1 === "BR"
          )?.rating;

          certification = currentRegionRating || esRating || gbRating;
        } else {
          const releaseDates = newData.release_dates.results;

          const currentRegionRating = releaseDates.find(
            (rating: any) => rating.iso_3166_1 === currentIndex
          )?.release_dates[0]?.certification;
          const esRating = releaseDates.find(
            (rating: any) => rating.iso_3166_1 === "ES"
          )?.release_dates[0]?.certification;
          const gbRating = releaseDates.find(
            (rating: any) => rating.iso_3166_1 === "BR"
          )?.release_dates[0]?.certification;

          certification = currentRegionRating || esRating || gbRating;
        }

        providerResponse =
          firstWatchProvider[currentIndex] || firstWatchProvider.US;
        providerResponse.id = id;
        providerResponse.genres = newData.genres ?? [];
        providerResponse.similars = similars;
        providerResponse.providers = providerResponse.flatrate;
        providerResponse.certification = certification;
        providerResponse = { ...firstElement, ...providerResponse };
      }

      return providerResponse;
    };

    const result = await getContent(notRepeatResult);

    result.title = result.title ?? result.name;
    result.genres = result.genres ?? [];
    result.duration = result.runtime;
    if (source === "tv") {
      result.episodes = result.number_of_episodes;
      result.seasons = result.number_of_seasons;
      result.lastEpisode = result.last_air_date;
    }
    if (providerResponse?.flatrate) {
      result.providers = providerResponse.flatrate;
      result.link = providerResponse.link;
      res.status(200).json(result);
    } else {
      res.status(206).json(result);
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ search: countGte });
  }
}
