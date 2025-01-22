import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "../ui/label";

type GenreProps = {
  handleGte: (id: number) => void;
  selectedGte: number;
};

export const Gte: FC<GenreProps> = ({ handleGte, selectedGte }) => {
  // @ts-ignore
  const gtes = [...Array(10).keys()].map((i) => i + 1);

  const handleChange = (value: string) => {
    handleGte(Number(value));
  };

  return (
    <>
      <Select value={selectedGte.toString()} onValueChange={handleChange}>
        <div className="w-full">
          <Label className="text-white text-xs" htmlFor="gte">
            Puntuación minima
          </Label>
          <SelectTrigger id="gte">
            <SelectValue placeholder="Géneros" />
          </SelectTrigger>
        </div>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Puntuaciones</SelectLabel>
            {gtes?.map((gte: number) => {
              return (
                <SelectItem key={`selected-gte-${gte}`} value={gte.toString()}>
                  {gte}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
