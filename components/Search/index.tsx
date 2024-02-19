/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useContext, useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { PageContext } from "@/context";
import { resetSearch, search } from "@/context/actions";
import { ContentInterface } from "@/pages/types";

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ContentBox from "../Similars/Box";

type SearchBoxProps = {
  source: string;
  region: string;
};

const SearchBox: FC<SearchBoxProps> = ({ source, region }) => {
  const {
    state: { fetching, searchResult, BASE_IMAGE_URL },
    dispatch,
  } = useContext(PageContext);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const resetModal = () => {
    setInputValue("");
    resetSearch(dispatch);
    setModalOpen(false);
  };

  const handleSearch = async () => {
    if (inputValue && inputValue !== "") {
      await search(dispatch, source, inputValue, region);
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
      if (!newState) resetModal()
  
      setModalOpen(newState)
    }
  }

  return (
    <Sheet open={modalOpen} onOpenChange={handleDialogChange}>
      <SheetTrigger asChild>
        <Button
          className="p-2 "
          color="gray"
          size="sm"
          variant="ghost"
        >
          <Search className="h-4 w-4 mr-1" /> Buscar
        </Button>
      </SheetTrigger>
      <SheetContent className="h-[500px]" side="top">
        <SheetHeader>
          <SheetTitle className='text-white font-semibold'>{`Buscar ${source === "tv" ? "serie" : "pelicula"}`}</SheetTitle>
          <SheetDescription className='text-gray-400'>
            {`Que ${source === "tv" ? "serie" : "pelicula"} estas buscando?`}
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
          <Button className="px-3 h-10 bg-secondary text-white hover:text-black" size="sm" type="submit" variant="outline" onClick={handleSearch}>
            <span className="sr-only">Search</span>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {searchResult?.length ? (
          <section className="overflow-y-auto max-h-modal-dialog pb-12">
            <div className="relative overflow-hidden h-auto w-full">
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
                <CarouselPrevious className="left-6 md:left-0" variant="secondary" />
                <CarouselNext className="right-6 md:right-0" variant="secondary" />
              </Carousel>
            </div>
          </section>
        ) : null}
      </SheetContent>
    </Sheet>
  )
};

export default SearchBox;
