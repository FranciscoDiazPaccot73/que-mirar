import type { NextApiRequest, NextApiResponse } from 'next'

const axios = require('axios');
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { source, region, q } = req.query;

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseObj = {
      language: 'es-AR',
      api_key: apiKey || '',
      region: region.toString(),
      query: q.toString()
    }
    const baseQueryParams = new URLSearchParams(baseObj);

    
    const { data } = await axios.get(`${BASE_URL}/search/${source}?${baseQueryParams}`)
    const { results } = data || {};

    res.status(200).json(results)
  } catch (err) {
    res.status(500);
  }
}
