// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const axios = require('axios');
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { source } = req.query;
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const pageRandom = Math.floor(Math.random() * 4 + 1) || '1';
    const indexRandom = Math.floor(Math.random() * 17 + 1) || 0;
    const baseObj = {
      language: 'es-AR',
      api_key: apiKey || '',
      page: pageRandom.toString(),
    }
    const baseQueryParams = new URLSearchParams(baseObj);
    const { data } = await axios.get(`${BASE_URL}/trending/${source}/week?${baseQueryParams}`)
    const { results } = data || {};
    const sortedResults = results.sort((a: any, b: any) => b.vote_average - a.vote_average && b.vote_count - a.vote_count);
    const contentToShow = sortedResults[indexRandom] ?? {};
    const [firstResult] = sortedResults;
    const result = contentToShow.id ? contentToShow : firstResult;
    const getProviders: any = new Promise(resolve => {
      axios.get(`${BASE_URL}/${source}/${result.id}/watch/providers?${baseQueryParams}`).then((response: any) => resolve(response));
    })
    const getContent: any = new Promise(resolve => {
      axios.get(`${BASE_URL}/${source}/${result.id}?${baseQueryParams}`).then((response: any) => resolve(response));
    })
    const [{ data: providers }, { data: contentInfo }] = await Promise.all([getProviders, getContent]);

    const { AR: provider } = providers.results || providers.results.US;

    result.overview = contentInfo.overview;
    result.tagline = contentInfo.tagline;
    result.title = contentInfo.title ?? contentInfo.name;
    result.link = provider.link;
    if (provider?.flatrate) {
      result.providers = provider.flatrate;
      res.status(200).json(result)
    }
    res.status(206).json(result)
  } catch (err) {
    res.status(500);
  }
}
