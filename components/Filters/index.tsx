import { FC, memo, useContext, useEffect, useRef } from 'react';

import Genres from './Genres';
import Providers from './Providers';

import { PageContext } from '../../context';
import { getGenres, getProviders, getRecomendation, setProvider, setSelectedGenre } from '../../context/actions';

interface FilterProps {
  source: string;
}

const Filters: FC<FilterProps> = ({ source }) => {
  const {
    dispatch,
    state: { watchRegion, selectedProvider = 0, selectedGenre = 0, fetching, recomendedContent = [], prevContent },
  } = useContext(PageContext);
  const firstRun = useRef(true);

  const getPageProviders = async () => {
    await getProviders(dispatch, source);
  };

  const getPageGenres = async () => {
    await getGenres(dispatch, source);
  };

  useEffect(() => {
    if (source && firstRun.current) {
      firstRun.current = false;
      getPageProviders();
      getPageGenres();
    }
  }, []);

  const handleFilter = async (id: number) => {
    if (!fetching && id !== selectedProvider) {
      setProvider(dispatch, id);
      await getRecomendation(dispatch, source, recomendedContent, prevContent, id, selectedGenre, watchRegion);
    }
  };

  const handleGenre = async (id: number) => {
    if (!fetching) {
      if (id !== selectedGenre) {
        setSelectedGenre(dispatch, id);
        if (id === 0) {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, null, watchRegion);
        } else {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, id, watchRegion);
        }
      }
    }
  };

  return (
    <section className="mt-8">
      <Providers handleFilter={handleFilter} />
      <Genres handleGenre={handleGenre} source={source} />
    </section>
  );
};

export default memo(Filters);
