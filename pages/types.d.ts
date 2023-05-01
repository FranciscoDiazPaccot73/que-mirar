export type GenresTypes = {
  id: number;
  name: string;
};

export interface ContentInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: GenresTypes[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  duration?: number;
  video?: boolean;
  name?: string;
  link?: string;
  providers?: string;
}
