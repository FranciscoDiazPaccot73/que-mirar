/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useContext, useState } from "react";

import { PageContext } from "@/context";
import { resetSearch, search } from "@/context/actions";
import { ContentInterface } from "@/pages/types";

import Button from "../Button";
import Input from "../Input";
import ContentBox from "../Similars/Box";
import Modal from "../Modal";

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
    <div>
      <Button
        color="gray"
        icon={<img alt="Open search modal" src="/search.svg" />}
        label="Buscar"
        variant="outline"
        onClick={() => setModalOpen(true)}
      />
      <Modal isOpen={modalOpen} resetModal={resetModal}>
        <div className="relative overflow-hidden h-auto w-full">
          <p className="font-bold text-xl mb-3 text-white">{`Buscar ${
            source === "tv" ? "serie" : "pelicula"
          }`}</p>
          <div className="w-full mt-5 flex items-center mb-6">
            <Input
              placeholder="Buscar por nombre"
              onChange={handleInputChange}
              onKeyUp={handleKeyUp}
            />
            <Button
              customClass="ml-3"
              disabled={fetching}
              h="10"
              label="Buscar"
              onClick={handleSearch}
            />
          </div>
          {searchResult?.length ? (
            <section className="overflow-y-auto max-h-modal-dialog pb-12">
              <div className="relative overflow-hidden h-auto w-full flex flex-col gap-4">
                <div className="grid gap-6 text-white grid-cols-1 px-3 md:gap-10 md:px-0 md:grid-cols-3">
                  {searchResult.map((result: ContentInterface) => (
                    <article key={result.id} onClick={resetModal}>
                      <ContentBox
                        content={result}
                        source={source}
                        url={BASE_IMAGE_URL}
                      />
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default SearchBox;
