import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { calculateMaxVotes, generateRandomIndexes } from '../../../utils';

const { BASE_URL, TMDB_API_KEY } = process.env;

export default async function getInitialRecomendations(req: NextApiRequest, res: NextApiResponse<any>) {
  const { source, provider, genre, region, gte = 6 } = req.query;
  const { MIN, MAX } = calculateMaxVotes({ source, genre });
  const countGte = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

  try {
    const appendToResponse = `similar,watch/providers,${source === 'tv' ? 'content_ratings' : 'release_dates'}`;
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === 'BR' ? 'pt-BR' : 'es-AR',
      api_key: apiKey || '',
      append_to_response: appendToResponse,
    };

    const providerToRequest = provider && provider !== '0' ? provider.toString() : '119|619|531|384|300|337|8';
    const genreToRequest = genre && genre !== '0' ? genre.toString() : '';
    const discoverObj = {
      ...baseObj,
      sort_by: 'vote_average.desc',
      'vote_count.gte': countGte.toString(),
      watch_region: region?.toString() ?? 'AR',
      with_watch_providers: providerToRequest,
      include_adult: 'false',
      with_genres: genreToRequest,
      "vote_average.gte": gte.toString(),
    };
    const discoverQueryParams = new URLSearchParams(discoverObj);
    const baseQueryParams = new URLSearchParams(baseObj);

    const initialRequest = async (params: any) => {
      const { data: firstData } = await axios.get(`${BASE_URL}/discover/${source}?${params}`);
      const { results: firstresponse } = firstData || {};

      firstresponse.totalPages = firstData.total_pages;

      return firstresponse;
    };
    const firstresponse = await initialRequest(discoverQueryParams);

    const { totalPages } = firstresponse;

    const pageRandom = Math.abs(Math.floor(Math.random() * (totalPages - 2) + 1)) || '1';
    const newObj = new URLSearchParams({ ...discoverObj, page: pageRandom.toString() });
    const { data } = await axios.get(`${BASE_URL}/discover/${source}?${newObj}`);
    const { results } = data || {};

    const getContent = async (elements: any) => {
      const [firstIndex, secondIndex] = generateRandomIndexes(2, elements.length);
      const { id: firstId } = elements[firstIndex] || {};
      const { id: secondId } = elements[secondIndex] || {};

      const [{ data: firstData }, { data: secondData }] = await Promise.all([
        axios.get(`${BASE_URL}/${source}/${firstId}?${baseQueryParams}`),
        axios.get(`${BASE_URL}/${source}/${secondId}?${baseQueryParams}`),
      ]);
      const currentIndex = region?.toString() ?? 'AR';
      const initialElements = [];

      if (firstData) {
        const firstWatchProvider = firstData["watch/providers"]?.results;
        const similars = firstData.similar.results;
        let providerResponse: any = null;

        let certification = '';

        if (source === "tv") {
          const contentRatings = firstData.content_ratings.results;

          
          const currentRegionRating = contentRatings.find((rating: any) => rating.iso_3166_1 === currentIndex)?.rating;
          const esRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'ES')?.rating;
          const gbRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'BR')?.rating;

          certification = currentRegionRating || esRating || gbRating;
        } else {
          const releaseDates = firstData.release_dates.results;

          const currentRegionRating = releaseDates.find((rating: any) => rating.iso_3166_1 === currentIndex)?.release_dates[0]?.certification;
          const esRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'ES')?.release_dates[0]?.certification;
          const gbRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'BR')?.release_dates[0]?.certification;

          certification = currentRegionRating || esRating || gbRating;
        }

        providerResponse = firstWatchProvider[currentIndex] || firstWatchProvider.US;
        providerResponse.id = firstId;
        providerResponse.genres = firstData.genres ?? [];
        providerResponse.providers = providerResponse.flatrate;
        providerResponse.similars = similars;
        providerResponse.certification = certification;
        initialElements.push({ ...elements[firstIndex], ...providerResponse });
      }

      if (secondData) {
        const secondWatchProvider = firstData["watch/providers"]?.results;
        let providerResponse: any = null;
        const similars = secondData.similar.results;

        let certification = '';

        if (source === "tv") {
          const contentRatings = secondData.content_ratings.results;

          
          const currentRegionRating = contentRatings.find((rating: any) => rating.iso_3166_1 === currentIndex)?.rating;
          const esRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'ES')?.rating;
          const gbRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'BR')?.rating;

          certification = currentRegionRating || esRating || gbRating;
        } else {
          const releaseDates = secondData.release_dates.results;

          const currentRegionRating = releaseDates.find((rating: any) => rating.iso_3166_1 === currentIndex)?.release_dates[0]?.certification;
          const esRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'ES')?.release_dates[0]?.certification;
          const gbRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'BR')?.release_dates[0]?.certification;

          certification = currentRegionRating || esRating || gbRating;
        }

        providerResponse = secondWatchProvider[currentIndex] || secondWatchProvider.US;
        providerResponse.id = secondId;
        providerResponse.genres = secondData.genres ?? [];
        providerResponse.similars = similars;
        providerResponse.certification = certification;
        providerResponse.providers = providerResponse.flatrate;
        initialElements.push({ ...elements[secondIndex], ...providerResponse });
      }

      return initialElements;
    };

    const result = await getContent(results);

    res.status(200).json(result);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ search: countGte });
  }
}
