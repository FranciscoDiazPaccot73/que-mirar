/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useContext, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { PageContext } from "@/context";
import {
  resetSearch,
  search,
  searchLocally,
  switchSearchValues,
} from "@/context/actions";
import { ContentInterface } from "@/pages/types";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ContentBox from "../Similars/Box";
import Skeleton from "../Skeleton";
import NoData from "../icons/NoData";

type SearchBoxProps = {
  source: string;
  region: string;
};

const sourceName: Record<string, string> = {
  movie: "peliculas",
  tv: "series",
};

const SearchBox: FC<SearchBoxProps> = ({ source, region }) => {
  const {
    state: { fetching, searchResult, BASE_IMAGE_URL },
    dispatch,
  } = useContext(PageContext);
  const [inputValue, setInputValue] = useState("");
  const [otherSearchResults, setSearchResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const otherSource = useMemo(
    () => (source === "movie" ? "tv" : "movie"),
    [source]
  );

  const resetModal = () => {
    setInputValue("");
    resetSearch(dispatch);
    setModalOpen(false);
    setSearchResults([]);
  };

  const handleSearch = async () => {
    if (inputValue && inputValue !== "") {
      search(dispatch, source, inputValue, region);

      const otherSourceData = await searchLocally(
        otherSource,
        inputValue,
        region
      );

      setSearchResults(otherSourceData);
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target?.value);
  };

  const handleKeyUp = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
      const inputElement = document.getElementById("search-input");

      if (inputElement) inputElement.blur();
    }
  };

  const handleDialogChange = (newState: boolean) => {
    if (!fetching) {
      if (!newState) resetModal();

      setModalOpen(newState);
    }
  };

  const handleSwitchValuesClick = () => {
    switchSearchValues(dispatch, otherSearchResults);
    setSearchResults([]);
  };

  return (
    <Sheet open={modalOpen} onOpenChange={handleDialogChange}>
      <SheetTrigger asChild>
        <Button className="p-2 " color="gray" size="sm" variant="ghost">
          <Search className="h-4 w-4 mr-1" /> Buscar
        </Button>
      </SheetTrigger>
      <SheetContent className="h-[500px]" side="top">
        <div className="max-w-[750px] mx-auto">
          <SheetHeader>
            <SheetTitle className="text-white font-semibold flex items-center">
              Buscar
              {otherSearchResults?.length ? (
                <button
                  className="text-xs text-gray-300 ml-3 underline"
                  onClick={handleSwitchValuesClick}
                >{`${otherSearchResults.length} ${sourceName[otherSource]} encontradas`}</button>
              ) : null}
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              ¿Qué serie o película estás buscando?
            </SheetDescription>
          </SheetHeader>
          <div className="flex items-center mt-4 space-x-2">
            <div className="grid flex-1 gap-2">
              <Label className="sr-only" htmlFor="search-box">
                Search box
              </Label>
              <Input
                id="search-box"
                placeholder="Nombre"
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
              />
            </div>
            <Button
              className="px-3 h-10 bg-secondary text-white hover:text-black"
              size="sm"
              type="submit"
              variant="outline"
              onClick={handleSearch}
            >
              <span className="sr-only">Search</span>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <section className="overflow-y-auto max-h-modal-dialog pb-12">
            <div className="relative overflow-hidden h-auto w-full">
              {searchResult?.length && !fetching ? (
                <Carousel
                  className="w-full px-10 py-6"
                  opts={{
                    align: "center",
                  }}
                >
                  <CarouselContent>
                    {searchResult.map((result: ContentInterface) => (
                      <ContentBox
                        key={result.id}
                        basis="md:basis-1/2"
                        content={result}
                        customAction={resetModal}
                        source={source}
                        url={BASE_IMAGE_URL}
                      />
                    ))}
                  </CarouselContent>
                  <CarouselPrevious
                    className="left-6 md:left-0"
                    variant="secondary"
                  />
                  <CarouselNext
                    className="right-6 md:right-0"
                    variant="secondary"
                  />
                </Carousel>
              ) : null}
              {fetching ? <Skeleton type="search" /> : null}
              {searchResult?.length === 0 && !fetching ? (
                <div className="h-[270px] mt-6 mx-auto w-[190px] rounded-lg border border-purple-50">
                  <NoData height="250px" width="170px" />
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBox;
