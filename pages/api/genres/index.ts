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
    const baseObj = {
      language: 'es-AR',
      api_key: apiKey || '',
      watch_region: 'AR',
    }
    const baseQueryParams = new URLSearchParams(baseObj);

    const { data } = await axios.get(`${BASE_URL}/genre/${source}/list?${baseQueryParams}`)
    const { genres } = data || [];  

    res.status(200).json(genres)
  } catch (err) {
    res.status(500);
  }
}
