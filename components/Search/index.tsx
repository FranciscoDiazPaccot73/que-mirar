import { useState, useEffect, useContext } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "@chakra-ui/icons";

import ContentBox from "../Similars/Box";
import Button from "../Button";
import Input from "../Input";

import { PageContext } from '../../context';
import { search, resetSearch } from '../../context/actions';

interface Props {
  source: string,
  region: string,
}

// TODO types

const SearchBox = ({ source, region }: Props) => {
  const { state: { fetching, searchResult, BASE_IMAGE_URL }, dispatch } = useContext(PageContext);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const inputElement = document.getElementById('search-input');
    if (isOpen && inputElement) inputElement.focus()
  }, [isOpen])

  const resetModal = () => {
    setIsOpen(false)
    setInputValue('')
    resetSearch(dispatch);
  }

  const handleSearch = async () => {
    if (inputValue && inputValue !== '') {
      await search(dispatch, source, inputValue, region)
    }
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target?.value)
  }

  const handleKeyUp = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  return (
    <div>
      <Button label="Buscar" onClick={() => setIsOpen(true)} icon={<SearchIcon />} variant="outline" color='gray' />
      <AnimatePresence>
        {isOpen && (
          <div className="z-20 fixed h-modal w-full flex justify-center top-0 left-0">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                y: -50,
                opacity: 0
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute t-0 z-10 p-7 h-full w-full max-w-xs rounded my-7 shadow-md bg-modal md:max-w-4xl"
            >
              <div className="absolute bottom-0 left-0 z-20 bg-gradient-to-t from-modal via-modal h-14 w-full" />
              <button
                aria-label="Close modal"
                onClick={resetModal}
                className="absolute top-0 right-0 -mt-4 -mr-4 bg-light-modal text-white border border-slate-600 bg-modal h-8 w-8 block mb-2 rounded-full"
              >
                &times;
              </button>
              <div className="relative overflow-hidden h-auto w-full">
                <p className="font-bold text-xl mb-3 text-white">{`Buscar ${source === 'tv' ? 'serie' : 'pelicula'}`}</p>
                <div className="w-full mt-5 flex items-center mb-6">
                  <Input onChange={handleInputChange} placeholder='Buscar por nombre' onKeyUp={handleKeyUp} />
                  <Button label="Buscar" customClass="ml-3" h='10' disabled={fetching} onClick={handleSearch} />
                </div>
                {searchResult?.length ? (
                  <section className="overflow-y-auto max-h-modal-dialog">
                    <div className="relative overflow-hidden h-auto w-full flex flex-col gap-4">
                      {searchResult.map((result: any) => (
                        <article className="h-[70px]" key={result.id} onClick={resetModal}>
                          <ContentBox content={result} url={BASE_IMAGE_URL} source={source}  />
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{ type: "spring", bounce: 0, duration: 0.2 }}
              onClick={resetModal}
              className="bg-transparent fixed h-full w-full flex items-center justify-center top-0 left-0"
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchBox;
