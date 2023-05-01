import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNextRecomendation(req: NextApiRequest, res: NextApiResponse<any>) {
  const { source, id, region } = req.query;
  const { BASE_URL, TMDB_API_KEY } = process.env;

  try {
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === 'BR' ? 'pt-BR' : 'es-AR',
      api_key: apiKey || '',
    };

    const baseQueryParams = new URLSearchParams(baseObj);

    const { data: contentInfo } = await axios.get(`${BASE_URL}/${source}/${id}?${baseQueryParams}`);

    const result = {
      ...contentInfo,
      overview: contentInfo.overview,
      title: contentInfo.title ?? contentInfo.name,
      duration: contentInfo.runtime,
    };

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ search: 'ERROR' });
  }
}
