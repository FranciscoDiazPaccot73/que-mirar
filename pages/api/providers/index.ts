import type { NextApiRequest, NextApiResponse } from 'next';

const axios = require('axios');

const BASE_URL = 'https://api.themoviedb.org/3';

const availableProviderId = [119, 619, 531, 384, 337, 8];

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const { source } = req.query;

  try {
    const apiKey = process.env.TMDB_API_KEY;
    const baseObj = {
      language: 'es-AR',
      api_key: apiKey || '',
      watch_region: 'AR',
    };
    const baseQueryParams = new URLSearchParams(baseObj);

    const { data } = await axios.get(`${BASE_URL}/watch/providers/${source}?${baseQueryParams}`);
    const { results } = data || {};
    const providers: any = [];

    availableProviderId.forEach((provRes: any) => {
      const availableProvider = results.find((prov: any) => prov.provider_id === provRes);

      providers.push(availableProvider);
    });

    res.status(200).json(providers);
  } catch (err) {
    res.status(500);
  }
}
