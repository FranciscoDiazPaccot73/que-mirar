import { memo, useContext, useEffect, FC } from 'react';

import Providers from './Providers';
import Genres from './Genres';

import { PageContext } from '../../context';
import { getProviders, getRecomendation, setProvider, getGenres, setSelectedGenre } from '../../context/actions';

interface FilterProps {
  source: string,
}

const Filters: FC<FilterProps> = ({ source }) => {
  const { dispatch, state: { watchRegion, selectedProvider = 0, selectedGenre = 0, fetching, recomendedContent = [], prevContent } } = useContext(PageContext);

  const getPageProviders = async () => {
    await getProviders(dispatch, source);
  }

  const getPageGenres = async () => {
    await getGenres(dispatch, source);
  }

  useEffect(() => {
    if (source) {
      getPageProviders();
      getPageGenres();
    }
  }, []);

  const handleFilter = async (id: number) => {
    if (!fetching && id !== selectedProvider) {
      setProvider(dispatch, id)
      await getRecomendation(dispatch, source, recomendedContent, prevContent, id, selectedGenre, watchRegion)
    }
  }

  const handleGenre = async (id: number) => {
    if (!fetching) {
      if (id !== selectedGenre) {
        setSelectedGenre(dispatch, id)
        if (id === 0) {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, null, watchRegion)
        } else {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, id, watchRegion)
        }
      }
    }
  }

  return (
    <section className='mt-8'>
      <Providers handleFilter={handleFilter} />
      <Genres source={source} handleGenre={handleGenre} />
    </section>
  )
}

export default memo(Filters);
