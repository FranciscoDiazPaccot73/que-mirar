import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getContent(req: NextApiRequest, res: NextApiResponse<any>) {
  const { source, id, region } = req.query;
  const { BASE_URL, TMDB_API_KEY } = process.env;

  try {
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === 'BR' ? 'pt-BR' : 'es-AR',
      api_key: apiKey || '',
    };
    const baseQueryParams = new URLSearchParams(baseObj);

    const [{ data: contentInfo }, { data }] = await Promise.all([
      axios.get(`${BASE_URL}/${source}/${id}?${baseQueryParams}`),
      axios.get(`${BASE_URL}/${source}/${id}/watch/providers?${baseQueryParams}`),
    ]);

    const currentIndex = region?.toString() ?? 'AR';

    let result;

    if (data.results) {
      result = data.results[currentIndex] || data.results.US || {};
      result.id = id;
    }

    result = { ...result, ...contentInfo };

    result.overview = contentInfo.overview;
    result.tagline = contentInfo.tagline;
    result.title = contentInfo.title ?? contentInfo.name;
    result.genres = contentInfo.genres ?? [];
    result.duration = contentInfo.runtime;

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
