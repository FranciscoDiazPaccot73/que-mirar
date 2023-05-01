import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { calculateMaxVotes, generateRandomIndexes } from '../../../utils';

export default async function getInitialRecomendations(req: NextApiRequest, res: NextApiResponse<any>) {
  const { source, provider, genre, region } = req.query;
  const { BASE_URL, TMDB_API_KEY } = process.env;
  const { MIN, MAX } = calculateMaxVotes({ source, genre });
  const countGte = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);

  try {
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === 'BR' ? 'pt-BR' : 'es-AR',
      api_key: apiKey || '',
    };

    const providerToRequest = provider && provider !== '0' ? provider.toString() : '119|619|531|384|300|337|8';
    const genreToRequest = genre ? genre.toString() : '';
    const discoverObj = {
      ...baseObj,
      sort_by: 'vote_average.desc',
      'vote_count.gte': countGte.toString(),
      watch_region: region?.toString() ?? 'AR',
      with_watch_providers: providerToRequest,
      include_adult: 'false',
      with_genres: genreToRequest,
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

    const pageRandom = Math.floor(Math.random() * (totalPages - 2) + 1) || '1';
    const newObj = new URLSearchParams({ ...discoverObj, page: pageRandom.toString() });
    const { data } = await axios.get(`${BASE_URL}/discover/${source}?${newObj}`);
    const { results } = data || {};

    const getWatchProvider = async (elements: any) => {
      const [firstIndex, secondIndex] = generateRandomIndexes(2, elements.length);
      const { id: firstId } = elements[firstIndex] || {};
      const { id: secondId } = elements[secondIndex] || {};

      const [{ data: firstData }, { data: secondData }] = await Promise.all([
        axios.get(`${BASE_URL}/${source}/${firstId}/watch/providers?${baseQueryParams}`),
        axios.get(`${BASE_URL}/${source}/${secondId}/watch/providers?${baseQueryParams}`),
      ]);
      const currentIndex = region?.toString() ?? 'AR';
      const initialElements = [];

      if (firstData.results && firstData.results[currentIndex]) {
        let providerResponse: any = null;

        providerResponse = firstData.results[currentIndex] || firstData.results.US;
        providerResponse.id = firstId;
        initialElements.push({ ...elements[firstIndex], ...providerResponse });
      }

      if (secondData.results && secondData.results[currentIndex]) {
        let providerResponse: any = null;

        providerResponse = secondData.results[currentIndex] || secondData.results.US;
        providerResponse.id = secondId;
        initialElements.push({ ...elements[secondIndex], ...providerResponse });
      }

      return initialElements;
    };

    const result = await getWatchProvider(results);

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ search: countGte });
  }
}
