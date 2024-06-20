import { FC, useContext } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GenresTypes } from "@/pages/types";
import { excludedGenres } from "@/utils";

import { PageContext } from "../../context";
import { Label } from "../ui/label";

type GenreProps = {
  handleGenre: (id: number) => void;
  source: string;
};

const Genres: FC<GenreProps> = ({ handleGenre, source }) => {
  const {
    state: { genres = [], selectedGenre = 0 },
  } = useContext(PageContext);
  const genresWithAll = genres.length
    ? [{ id: 0, name: "TODOS" }, ...genres]
    : [];

  const handleChange = (value: string) => {
    handleGenre(Number(value));
  };

  return (
    <>
      <Select value={selectedGenre.toString()} onValueChange={handleChange}>
        <div className="w-full">
          <Label className="text-white text-xs" htmlFor="genres">
            Géneros
          </Label>
          <SelectTrigger id="genres">
            <SelectValue placeholder="Géneros" />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Géneros</SelectLabel>
            {genresWithAll?.map((genre: GenresTypes) => {
              if (
                source === "tv" &&
                excludedGenres.includes(genre.id.toString())
              )
                return null;

              return (
                <SelectItem
                  key={`selected-genre-${genre.id}`}
                  value={genre.id.toString()}
                >
                  {genre?.name.toUpperCase()}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default Genres;
