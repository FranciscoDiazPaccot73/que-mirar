import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getContent(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { source, id, region } = req.query;
  const { BASE_URL, TMDB_API_KEY } = process.env;

  try {
    const appendToResponse = `similar,watch/providers,${source === 'tv' ? 'content_ratings' : 'release_dates'}`;
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === "BR" ? "pt-BR" : "es-AR",
      api_key: apiKey || "",
      append_to_response: appendToResponse,
    };
    const baseQueryParams = new URLSearchParams(baseObj);

    const { data: contentInfo } = await axios.get(`${BASE_URL}/${source}/${id}?${baseQueryParams}`)

    const currentIndex = region?.toString() ?? "AR";

    let result;

    const watchProvider = contentInfo["watch/providers"]

    if (watchProvider) {
      result = watchProvider[currentIndex] || watchProvider.results.US || {};
      result.id = id;
    }

    result = { ...result, ...contentInfo };

    let certification = '';

    if (source === "tv") {
      const contentRatings = contentInfo.content_ratings.results;

      certification = contentRatings.find((rating: any) => rating.iso_3166_1 === currentIndex)?.rating;
    } else {
      const releaseDates = contentInfo.release_dates.results;

      certification = releaseDates.find((rating: any) => rating.iso_3166_1 === currentIndex)?.certification;
    }

    result.overview = contentInfo.overview;
    result.tagline = contentInfo.tagline;
    result.title = contentInfo.title ?? contentInfo.name;
    result.genres = contentInfo.genres ?? [];
    result.duration = contentInfo.runtime;
    result.similars = contentInfo.similar.results;
    result.certification = certification;
    if (source === "tv") {
      result.episodes = contentInfo.number_of_episodes;
      result.seasons = contentInfo.number_of_seasons;
      result.lastEpisode = contentInfo.last_air_date;
    }

    if (result?.flatrate) {
      result.providers = result.flatrate;
      res.status(200).json(result);
    } else {
      res.status(206).json(result);
    }
  } catch (err: any) {
    res.status(500);
  }
}

export const getContentApi = async ({
  source,
  id,
  region,
}: {
  source: string;
  id: string;
  region: string;
}) => {
  const { BASE_URL, TMDB_API_KEY } = process.env;

  try {
    const appendToResponse = `similar,watch/providers,${source === 'tv' ? 'content_ratings' : 'release_dates'}`;
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === "BR" ? "pt-BR" : "es-AR",
      api_key: apiKey || "",
      append_to_response: appendToResponse,
    };
    const baseQueryParams = new URLSearchParams(baseObj);

    const { data: contentInfo } = await axios.get(`${BASE_URL}/${source}/${id}?${baseQueryParams}`)

    const currentIndex = region?.toString() ?? "AR";

    let result;

    const watchProvider = contentInfo["watch/providers"]?.results

    if (watchProvider) {
      result = watchProvider[currentIndex] || watchProvider.US || {};
      result.id = id;
    }

    result = { ...result, ...contentInfo };

    let certification = '';

    if (source === "tv") {
      const contentRatings = contentInfo.content_ratings.results;
      
      const currentRegionRating = contentRatings.find((rating: any) => rating.iso_3166_1 === currentIndex)?.rating;
      const esRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'ES')?.rating;
      const gbRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'BR')?.rating;

      certification = currentRegionRating || esRating || gbRating;
    } else {
      const releaseDates = contentInfo.release_dates.results;

      const currentRegionRating = releaseDates.find((rating: any) => rating.iso_3166_1 === currentIndex)?.release_dates[0]?.certification;
      const esRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'ES')?.release_dates[0]?.certification;
      const gbRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'BR')?.release_dates[0]?.certification;

      certification = currentRegionRating || esRating || gbRating;
    }

    result.overview = contentInfo.overview;
    result.tagline = contentInfo.tagline;
    result.title = contentInfo.title ?? contentInfo.name;
    result.genres = contentInfo.genres ?? [];
    result.duration = contentInfo.runtime;
    result.similars = contentInfo.similar.results;
    result.certification = certification;
    if (source === "tv") {
      result.episodes = contentInfo.number_of_episodes;
      result.seasons = contentInfo.number_of_seasons;
      result.lastEpisode = contentInfo.last_air_date;
    }

    if (result?.flatrate) {
      result.providers = result.flatrate;
    }

    return result;
  } catch (err: any) {
    return null;
  }
};
