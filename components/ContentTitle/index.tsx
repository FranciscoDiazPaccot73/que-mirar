import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/router";
import { FilterIcon, FilterXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ContentInterface } from "@/pages/types";
import SearchBox from "../Search";

import { PageContext } from "../../context";
import {
  getInfo,
  resetValues,
  setTimeframe,
  getInitialRecomendations,
  getRecomendation,
  setSimilars,
  setProvider,
  setSelectedGenre,
  setGte,
} from "../../context/actions";
import Filters from "../Filters";
import { Switcher } from "../Switcher";
import { Region } from "../Filters/Region";

type ContentTitleProps = {
  watchRegion: string;
  source: string;
  search: string;
  onChangeRegion?: (newRegion: any) => void;
};

export type Filter = {
  genre?: number;
  provider?: number;
  gte?: number;
};

const DEFAULT_FILTERS = { genre: 0, provider: 0, gte: 6 };

const ContentTitle: FC<ContentTitleProps> = ({
  search,
  watchRegion,
  onChangeRegion = () => {},
  source,
}) => {
  const {
    dispatch,
    state: {
      fetching,
      selectedTimeframe = "day",
      selectedProvider = 0,
      selectedGenre = 0,
      selectedGte = 6,
      recomendedContent = [],
      prevContent,
    },
  } = useContext(PageContext);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [appliedFilter, setAppliedFilter] = useState<Filter>(DEFAULT_FILTERS);
  const animationOffset = useRef("115px");
  const { pathname } = useRouter();

  const basePath = useMemo(
    () => (pathname?.includes("movies") ? "/movies/" : "/"),
    [pathname]
  );

  useEffect(() => {
    if (window.innerWidth < 768) animationOffset.current = "70px";
  }, []);

  const trendigsWording = watchRegion === "BR" ? "Tendências" : "Tendencias";
  const recomendationsWording =
    watchRegion === "BR" ? "Recomendações" : "Recomendaciones";

  const getTrending = (frame: string) => {
    if (!fetching) {
      resetValues(dispatch);
      getInfo(dispatch, source, frame);
    }
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setAppliedFilter(DEFAULT_FILTERS);
  };

  const handleTimeframe = (frame: string) => {
    if (!fetching && frame !== selectedTimeframe) {
      setTimeframe(dispatch, frame);
      getTrending(frame);
    }
  };

  const handleNewSource = () => {
    resetValues(dispatch);
    window.location.assign(
      search === "trends" ? `${basePath}recomendations` : basePath
    );
  };

  const applyFilters = async (selectedFiltersToSave: any) => {
    if (!fetching) {
      window.scrollTo(0, 0);

      setSelectedGenre(dispatch, selectedFiltersToSave.genre!);
      setProvider(dispatch, selectedFiltersToSave.provider!);
      setGte(dispatch, selectedFiltersToSave.gte!);

      const recom = await getRecomendation(
        dispatch,
        source,
        recomendedContent,
        prevContent,
        selectedFiltersToSave.provider,
        selectedFiltersToSave.genre,
        watchRegion,
        selectedFiltersToSave.gte,
        true
      );

      // @ts-ignore
      setSimilars(dispatch, recom.similars as ContentInterface[]);
      getInitialRecomendations(
        dispatch,
        source,
        selectedFiltersToSave.provider,
        watchRegion,
        selectedFiltersToSave.genre
      );

      closeSheet();
    }
  };

  const handleFilters = () => {
    applyFilters(appliedFilter);
  };

  const resetFilters = () => {
    applyFilters(DEFAULT_FILTERS);
  };

  const handleFilterChange = (filter: Filter) => {
    setAppliedFilter((prevValues) => ({ ...prevValues, ...filter }));
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      closeSheet();
    } else {
      setSheetOpen(value);
    }
  };

  return (
    <div className="flex text-white flex-col items-center justify-between md:mb-8">
      <div className="w-full px-3 md:px-0 md:flex md:gap-10 md:items-end">
        <div className="w-full mb-0 hidden md:block">
          <Switcher
            isLeftActiveTab={search === "trends"}
            left={trendigsWording}
            right={recomendationsWording}
            onClick={handleNewSource}
          />
        </div>
        <header className="w-full flex items-center justify-between mb-5 md:hidden">
          <div className="flex items-center justify-center">
            <Image
              priority
              alt="Logo"
              height={80}
              src="/logo.webp"
              width={100}
            />
          </div>
          <Switcher
            isLeftActiveTab={search === "trends"}
            left={trendigsWording}
            right={recomendationsWording}
            onClick={handleNewSource}
          />
        </header>
        <div className="flex gap-3 justify-end md:ml-auto md:mr-2">
          <SearchBox region={watchRegion} source={source} />
          <Sheet open={sheetOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
              <Button
                className="p-2 hover:bg-purple-12"
                size="sm"
                variant="ghost"
              >
                {selectedGte !== DEFAULT_FILTERS.gte ||
                selectedGenre !== DEFAULT_FILTERS.genre ||
                selectedProvider !== DEFAULT_FILTERS.provider ? (
                  <FilterXIcon className="h-5 w-5 text-purple" />
                ) : (
                  <FilterIcon className="h-5 w-5 text-purple" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-white font-semibold">
                  Filtros
                </SheetTitle>
              </SheetHeader>
              <SheetDescription className="text-gray-300 mt-6">
                {`Filtra tus resultados por región${
                  search === "trends" ? " y tendencia" : ""
                }.`}
              </SheetDescription>
              <div className="flex w-full gap-10 items-center justify-center mt-2">
                <Region
                  selectedFilter={closeSheet}
                  onChangeRegion={onChangeRegion}
                />
                {search === "trends" ? (
                  <Switcher
                    isLeftActiveTab={selectedTimeframe === "day"}
                    label="Tendencia"
                    left="Hoy"
                    right="Semana"
                    onClick={() =>
                      handleTimeframe(
                        selectedTimeframe === "day" ? "week" : "day"
                      )
                    }
                  />
                ) : null}
              </div>
              <SheetDescription className="text-gray-300 mt-10">
                Aplica otros filtros para obtener una busqueda mas exacta.
              </SheetDescription>
              <Filters
                localFilters={appliedFilter}
                source={source}
                onChangeFilter={handleFilterChange}
              />
              <SheetFooter className="flex items-center justify-center mt-12 gap-4 md:gap-1">
                <Button
                  className="w-full text-gray-300"
                  disabled={
                    fetching ||
                    (selectedGenre === DEFAULT_FILTERS.genre &&
                      selectedProvider === DEFAULT_FILTERS.provider)
                  }
                  size="default"
                  variant="ghost"
                  onClick={resetFilters}
                >
                  Limpiar filtros
                </Button>
                <Button
                  className="w-full bg-purple border-purple-50 hover:bg-purple-hover"
                  disabled={
                    fetching ||
                    (appliedFilter.gte === DEFAULT_FILTERS.gte &&
                      appliedFilter.genre === DEFAULT_FILTERS.genre &&
                      appliedFilter.provider === DEFAULT_FILTERS.provider)
                  }
                  size="default"
                  variant="outline"
                  onClick={handleFilters}
                >
                  Aplicar
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

ContentTitle.defaultProps = {
  onChangeRegion: () => {},
};

export default ContentTitle;
