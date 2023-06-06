/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FC, useContext, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { PageContext } from '@/context';
import { resetSearch, search, setIsModalOpen as setIsOpen } from '@/context/actions';
import { ContentInterface } from '@/pages/types';

import Button from '../Button';
import Input from '../Input';
import ContentBox from '../Similars/Box';

type SearchBoxProps = {
  source: string;
  region: string;
};

const SearchBox: FC<SearchBoxProps> = ({ source, region }) => {
  const {
    state: { isModalOpen: isOpen, fetching, searchResult, BASE_IMAGE_URL },
    dispatch,
  } = useContext(PageContext);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const inputElement = document.getElementById('search-input');

    if (isOpen && inputElement) {
      inputElement.focus();
      const body = document.getElementById('body');

      body?.classList.add('scroll-disabled');
    }
  }, [isOpen]);

  const resetModal = () => {
    setIsOpen(dispatch, false);
    setInputValue('');
    resetSearch(dispatch);

    const body = document.getElementById('body');

    body?.classList.remove('scroll-disabled');
  };

  const handleSearch = async () => {
    if (inputValue && inputValue !== '') {
      await search(dispatch, source, inputValue, region);
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target?.value);
  };

  const handleKeyUp = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleSearch();
      const inputElement = document.getElementById('search-input');

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
        onClick={() => setIsOpen(dispatch, true)}
      />
      <AnimatePresence>
        {isOpen && (
          <div className="z-20 fixed h-modal w-full flex justify-center top-0 left-0">
            <motion.div
              animate={{
                y: 0,
                opacity: 1,
              }}
              className="absolute t-0 z-10 p-7 h-full w-full max-w-xs rounded my-7 shadow-md bg-modal md:max-w-4xl"
              exit={{
                y: -50,
                opacity: 0,
              }}
              initial={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            >
              <div className="absolute bottom-0 left-0 z-20 bg-gradient-to-t from-modal via-modal h-14 w-full" />
              <button
                aria-label="Close modal"
                className="absolute top-0 right-0 -mt-4 -mr-4 bg-light-modal text-white border border-slate-600 bg-modal h-8 w-8 block mb-2 rounded-full"
                onClick={resetModal}
              >
                &times;
              </button>
              <div className="relative overflow-hidden h-auto w-full">
                <p className="font-bold text-xl mb-3 text-white">{`Buscar ${source === 'tv' ? 'serie' : 'pelicula'}`}</p>
                <div className="w-full mt-5 flex items-center mb-6">
                  <Input placeholder="Buscar por nombre" onChange={handleInputChange} onKeyUp={handleKeyUp} />
                  <Button customClass="ml-3" disabled={fetching} h="10" label="Buscar" onClick={handleSearch} />
                </div>
                {searchResult?.length ? (
                  <section className="overflow-y-auto max-h-modal-dialog pb-12">
                    <div className="relative overflow-hidden h-auto w-full flex flex-col gap-4">
                      {searchResult.map((result: ContentInterface) => (
                        <article key={result.id} className="h-[70px]" onClick={resetModal}>
                          <ContentBox content={result} source={source} url={BASE_IMAGE_URL} />
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>
            </motion.div>
            <motion.div
              animate={{
                opacity: 1,
              }}
              className="bg-transparent fixed h-full w-full flex items-center justify-center top-0 left-0"
              exit={{
                opacity: 0,
              }}
              initial={{ opacity: 0 }}
              transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
              onClick={resetModal}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
