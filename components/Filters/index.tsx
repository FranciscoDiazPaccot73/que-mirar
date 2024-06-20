import { FC, memo, useContext, useEffect, useRef } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { availableRegions } from "@/utils";
import Genres from "./Genres";
import { Providers } from "./Providers";

import { PageContext } from "../../context";
import {
  getGenres,
  getInitialRecomendations,
  getRecomendation,
  getSimilars,
  setProvider,
  setSelectedGenre,
} from "../../context/actions";
import { Label } from "../ui/label";

interface FilterProps {
  source: string;
  selectedFilter: () => void;
  onChangeRegion: (arg: string) => void;
}

const Filters: FC<FilterProps> = ({
  onChangeRegion,
  source,
  selectedFilter,
}) => {
  const {
    dispatch,
    state: {
      watchRegion = "AR",
      selectedProvider = 0,
      selectedGenre = 0,
      fetching,
      genres,
      recomendedContent = [],
      prevContent,
    },
  } = useContext(PageContext);
  const sourceFetched = useRef<string>();

  const getPageGenres = async () => {
    await getGenres(dispatch, source);
  };

  useEffect(() => {
    console.log(source, sourceFetched.current, genres);
    if (source && source !== sourceFetched.current && !genres?.length) {
      sourceFetched.current = source;
      getPageGenres();
    }
  }, [source]);

  const handleFilter = async (id: number) => {
    if (!fetching && id !== selectedProvider) {
      setProvider(dispatch, id);
      window.scrollTo(0, 0);
      selectedFilter();
      const recoId = await getRecomendation(
        dispatch,
        source,
        recomendedContent,
        prevContent,
        id,
        selectedGenre,
        watchRegion,
        true
      );

      getSimilars(dispatch, source, recoId, watchRegion);
      getInitialRecomendations(
        dispatch,
        source,
        id,
        watchRegion,
        selectedGenre
      );
    }
  };

  const handleGenre = async (id: number) => {
    if (!fetching) {
      if (id !== selectedGenre) {
        setSelectedGenre(dispatch, id);
        window.scrollTo(0, 0);
        selectedFilter();
        if (id === 0) {
          await getRecomendation(
            dispatch,
            source,
            recomendedContent,
            prevContent,
            selectedProvider,
            null,
            watchRegion,
            true
          );
          getInitialRecomendations(
            dispatch,
            source,
            selectedProvider,
            watchRegion
          );
        } else {
          await getRecomendation(
            dispatch,
            source,
            recomendedContent,
            prevContent,
            selectedProvider,
            id,
            watchRegion,
            true
          );
          getInitialRecomendations(
            dispatch,
            source,
            selectedProvider,
            watchRegion,
            id
          );
        }
      }
    }
  };

  const handleChangeRegion = (value: string) => {
    onChangeRegion(value);
    selectedFilter();
  };

  return (
    <section className="mt-8">
      <div className="flex gap-4 mb-10 w-full">
        <Select value={watchRegion} onValueChange={handleChangeRegion}>
          <div className="w-full">
            <Label className="text-white text-xs" htmlFor="region">
              Región
            </Label>
            <SelectTrigger id="region">
              <SelectValue placeholder="Región" />
            </SelectTrigger>
          </div>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Regiones</SelectLabel>
              {availableRegions.map((region: string) => (
                <SelectItem key={`region-${region}`} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Genres handleGenre={handleGenre} source={source} />
      </div>
      <Providers handleFilter={handleFilter} />
    </section>
  );
};

export default memo(Filters);
