import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { calculateMaxVotes } from '../../../utils';

export default async function getRecomendation(req: NextApiRequest, res: NextApiResponse<any>) {
  const { source, recomended, provider, genre, region } = req.query;
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
    const alreadyReco = (recomended as string).split('|');
    const discoverQueryParams = new URLSearchParams(discoverObj);
    const baseQueryParams = new URLSearchParams(baseObj);

    const initialRequest = async (params: any) => {
      const { data: firstData } = await axios.get(`${BASE_URL}/discover/${source}?${params}`);
      const { results: firstresponse } = firstData || {};

      firstresponse.totalPages = firstData.total_pages;

      return firstresponse;
    };
    let firstresponse = await initialRequest(discoverQueryParams);

    if (!firstresponse.length) {
      firstresponse = await initialRequest({ ...discoverQueryParams, 'vote_count.gte': 0 });
    }

    const { totalPages } = firstresponse;

    const pageRandom = Math.floor(Math.random() * (totalPages - 2) + 1) || '1';
    const newObj = new URLSearchParams({ ...discoverObj, page: pageRandom.toString() });
    const { data } = await axios.get(`${BASE_URL}/discover/${source}?${newObj}`);
    const { results } = data || {};
    let providerResponse: any = null;
    const notRepeatResult = results.filter((r: any) => !alreadyReco.includes(r.id.toString()));

    if (!notRepeatResult.length)
      res.status(404).json({ noResult: 'No encontramos mas contenido para tus filtros aplicados', search: countGte, type: 'warning' });

    const getWatchProvider = async (elements: any) => {
      const indexRandom = Math.floor(Math.random() * (elements.length - 2) + 1) || 0;
      const { id: firstId } = elements[indexRandom] || {};
      let id = firstId;
      let others = elements;

      if (alreadyReco.includes(firstId.toString())) {
        others = elements.filter((elem: any) => elem.id !== id);
        const { id: newId } = others[indexRandom] || {};

        id = newId;
      }
      const firstElement = others[indexRandom];
      const { data: newData } = await axios.get(`${BASE_URL}/${source}/${id}/watch/providers?${baseQueryParams}`);
      const currentIndex = region?.toString() ?? 'AR';

      if (newData.results && newData.results[currentIndex] && !alreadyReco.includes(id.toString())) {
        providerResponse = newData.results[currentIndex] || newData.results.US;
        providerResponse.id = id;
        providerResponse = { ...firstElement, ...providerResponse };
      }

      return providerResponse;
    };

    const result = await getWatchProvider(notRepeatResult);

    const { data: contentInfo } = await axios.get(`${BASE_URL}/${source}/${result.id}?${baseQueryParams}`);

    result.overview = contentInfo.overview;
    result.tagline = contentInfo.tagline;
    result.title = contentInfo.title ?? contentInfo.name;
    result.genres = contentInfo.genres ?? [];
    result.duration = contentInfo.runtime;
    if (source === 'tv') {
      result.episodes = contentInfo.number_of_episodes
      result.seasons = contentInfo.number_of_seasons
      result.lastEpisode = contentInfo.last_air_date
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
