import { ContentInterface } from "@/pages/types";

export type CurrentValues = {
  image: string;
  name: string;
  votes: number;
  id: number;
};

export const getLastSearchItems = (values: CurrentValues[], result: ContentInterface, source: string) => {
  const lastSearchItem = {
    image: result.poster_path,
    name: result.name || result.title,
    votes: result.vote_average,
    id: result.id,
    source
  }

  const currentValues = values || [];

  const newLastSearch = new Set([lastSearchItem, ...currentValues]);
  const arr = Array.from(newLastSearch);

  if (arr.length > 5) arr.pop()

  return arr;
}