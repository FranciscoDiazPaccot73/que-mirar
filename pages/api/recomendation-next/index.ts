import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function getNextRecomendation(req: NextApiRequest, res: NextApiResponse<any>) {
  const { source, id, region } = req.query;
  const { BASE_URL, TMDB_API_KEY } = process.env;

  try {
    const appendToResponse = `similar,watch/providers,${source === 'tv' ? 'content_ratings' : 'release_dates'}`;
    const apiKey = TMDB_API_KEY;
    const baseObj = {
      language: region === 'BR' ? 'pt-BR' : 'es-AR',
      api_key: apiKey || '',
      append_to_response: appendToResponse,
    };

    const baseQueryParams = new URLSearchParams(baseObj);

    const { data: contentInfo } = await axios.get(`${BASE_URL}/${source}/${id}?${baseQueryParams}`);

     const currentIndex = region?.toString() ?? "AR";

    const watchProvider = contentInfo["watch/providers"]?.results

    let provider = {};

    if (watchProvider) {
      provider = watchProvider[currentIndex] || watchProvider.US || {};
    }

    const result = {
      ...contentInfo,
      ...provider,
      overview: contentInfo.overview,
      title: contentInfo.title ?? contentInfo.name,
      duration: contentInfo.runtime,
    };

    let certification = '';

    if (source === "tv") {
      const contentRatings = contentInfo.content_ratings.results;

      
      const currentRegionRating = contentRatings.find((rating: any) => rating.iso_3166_1 === currentIndex)?.rating;
      const esRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'ES')?.rating;
      const gbRating = contentRatings.find((rating: any) => rating.iso_3166_1 === 'BR')?.rating;

      certification = currentRegionRating || esRating || gbRating;
    } else {
      const releaseDates = contentInfo.release_dates.results;

      const currentRegionRating = releaseDates.find((rating: any) => rating.iso_3166_1 === currentIndex)?.release_dates[0]?.certification;
      const esRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'ES')?.release_dates[0]?.certification;
      const gbRating = releaseDates.find((rating: any) => rating.iso_3166_1 === 'BR')?.release_dates[0]?.certification;

      certification = currentRegionRating || esRating || gbRating;
    }

    if (source === 'tv') {
      result.episodes = contentInfo.number_of_episodes
      result.seasons = contentInfo.number_of_seasons
      result.lastEpisode = contentInfo.last_air_date
    }

    result.similars = contentInfo.similar.results;
    result.certification = certification;

    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ search: 'ERROR' });
  }
}
