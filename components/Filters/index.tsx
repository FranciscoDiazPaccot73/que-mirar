import { FC, memo, useContext, useEffect, useRef } from "react";

import Genres from "./Genres";
import { Providers } from "./Providers";

import { PageContext } from "../../context";
import {
  getGenres,
} from "../../context/actions";
import type { Filter } from "../ContentTitle";

interface FilterProps {
  source: string;
  localFilters: Filter;
  onChangeFilter: (arg: Filter) => void;
}

const Filters: FC<FilterProps> = ({
  onChangeFilter,
  source,
  localFilters,
}) => {
  const {
    dispatch,
    state: {
      selectedProvider = 0,
      selectedGenre = 0,
      fetching,
      genres,
    },
  } = useContext(PageContext);
  const sourceFetched = useRef<string>();

  const getPageGenres = async () => {
    await getGenres(dispatch, source);
  };

  useEffect(() => {
    if (source && source !== sourceFetched.current && !genres?.length) {
      sourceFetched.current = source;
      getPageGenres();
    }
  }, [source]);

  const handleFilter = async (id: number) => {
    if (!fetching && id !== selectedProvider) {
      onChangeFilter({ provider: id });
    }
  };

  const handleGenre = async (id: number) => {
    if (!fetching) {
      if (id !== selectedGenre) {
        onChangeFilter({ genre: id });
      }
    }
  };

  return (
    <section className="mt-2">
      <div className="flex gap-4 mb-10 w-full">
        <Genres handleGenre={handleGenre} selectedGenre={localFilters.genre || selectedGenre} source={source} />
      </div>
      <Providers handleFilter={handleFilter} selectedProvider={localFilters.provider || selectedProvider} />
    </section>
  );
};

export default memo(Filters);
