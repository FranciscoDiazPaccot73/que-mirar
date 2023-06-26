import { FC, memo, useContext, useEffect } from 'react';

import Genres from './Genres';
import Providers from './Providers';

import { PageContext } from '../../context';
import { getGenres, getInitialRecomendations, getProviders, getRecomendation, setProvider, setSelectedGenre } from '../../context/actions';

interface FilterProps {
  source: string;
  selectedFilter: () => void;
}

const Filters: FC<FilterProps> = ({ source, selectedFilter }) => {
  const {
    dispatch,
    state: { watchRegion = 'AR', selectedProvider = 0, selectedGenre = 0, fetching, recomendedContent = [], prevContent },
  } = useContext(PageContext);

  const getPageProviders = async () => {
    await getProviders(dispatch, source);
  };

  const getPageGenres = async () => {
    await getGenres(dispatch, source);
  };

  useEffect(() => {
    if (source) {
      getPageProviders();
      getPageGenres();
    }
  }, [source]);

  const handleFilter = async (id: number) => {
    if (!fetching && id !== selectedProvider) {
      setProvider(dispatch, id);
      window.scrollTo(0, 0);
      selectedFilter();
      await getRecomendation(dispatch, source, recomendedContent, prevContent, id, selectedGenre, watchRegion, true);
      getInitialRecomendations(dispatch, source, id, watchRegion, selectedGenre);
    }
  };

  const handleGenre = async (id: number) => {
    if (!fetching) {
      if (id !== selectedGenre) {
        setSelectedGenre(dispatch, id);
        window.scrollTo(0, 0);
        selectedFilter();
        if (id === 0) {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, null, watchRegion, true);
          getInitialRecomendations(dispatch, source, selectedProvider, watchRegion);
        } else {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, id, watchRegion, true);
          getInitialRecomendations(dispatch, source, selectedProvider, watchRegion, id);
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
