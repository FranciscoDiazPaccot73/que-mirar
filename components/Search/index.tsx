/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useContext, useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react";

import { PageContext } from "@/context";
import { resetSearch, search } from "@/context/actions";
import { ContentInterface } from "@/pages/types";

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Input from "../Input";
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

  return (
    <AlertDialog open={modalOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="p-2 "
          color="gray"
          size="sm"
          variant="ghost"
          onClick={() => setModalOpen(true)}
        >
          <Search className="h-4 w-4 mr-1" /> Buscar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Buscar ${source === "tv" ? "serie" : "pelicula"}`}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="w-full mt-5 flex items-center mb-6">
            <Input
              placeholder="Nombre"
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
            />
            <Button
              className="ml-3 h-10"
              disabled={fetching}
              onClick={handleSearch}
            />
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
        <AlertDialogFooter onClick={resetModal}>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SearchBox;
