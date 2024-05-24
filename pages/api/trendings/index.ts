// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const { BASE_URL } = process.env;

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const { source, time, page } = req.query;

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseObj = {
      language: 'es-AR',
      api_key: apiKey || '',
      page: page?.toString() || '1',
    };
    const baseQueryParams = new URLSearchParams(baseObj);

    const { data } = await axios.get(`${BASE_URL}/trending/${source}/${time}?${baseQueryParams}`);
    const { results } = data || {};
    const rest = results.sort((a: any, b: any) => b.vote_average - a.vote_average && b.vote_count - a.vote_count);

    res.status(200).json({ results: rest });
  } catch (err) {
    res.status(500);
  }
}
