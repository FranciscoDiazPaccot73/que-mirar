import { ContentInterface } from "@/pages/types";

type CurrentValues = {
  image: string;
  name: string;
  votes: number;
};

export const getLastSearchItems = (values: CurrentValues[], result: ContentInterface) => {
  const lastSearchItem = {
    image: result.poster_path,
    name: result.name,
    votes: result.vote_average,
  }

  const currentValues = values || [];

  const newLastSearch = new Set([lastSearchItem, ...currentValues]);
  const arr = Array.from(newLastSearch);

  if (arr.length > 5) arr.pop()

  return arr;
}