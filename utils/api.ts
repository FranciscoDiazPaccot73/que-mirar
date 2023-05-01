import { ContentInterface } from '@/pages/types';

export const getBaseInfoForFetch = () => {
  const apiKey = process.env.TMDB_API_KEY;
  const randomPage = Math.floor(Math.random() * 2 + 1) || '1';
  const randomIndex = Math.floor(Math.random() * 17 + 1) || 0;
  const baseObj = {
    language: 'es-AR',
    api_key: apiKey || '',
    page: randomPage.toString(),
  };

  const baseQueryParams = new URLSearchParams(baseObj);

  return { randomIndex, baseQueryParams };
};

export const getResultsFormatted = (results: ContentInterface[], randomIndex: number) => {
  const sortedResults = results.sort((a: any, b: any) => b.vote_average - a.vote_average && b.vote_count - a.vote_count);
  const contentToShow = sortedResults[randomIndex] ?? {};
  const [firstResult] = sortedResults;
  const result = contentToShow.id ? contentToShow : firstResult;

  const rest = sortedResults.filter((info: any) => info.id !== result.id);

  return { result, rest };
};
