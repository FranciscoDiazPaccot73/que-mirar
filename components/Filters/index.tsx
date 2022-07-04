import { memo, useContext, useEffect } from 'react';

import { Box } from '@chakra-ui/react'
import Providers from './Providers';
import Genres from './Genres';

import { PageContext } from '../../context';
import { getProviders, getRecomendation, setProvider, getGenres, setSelectedGenre } from '../../context/actions';

interface Props {
  source: string,
  device: string|null,
}

const Filters = ({ source, device }: Props) => {
  const { dispatch, state: { selectedProvider = 0, selectedGenre, fetching, recomendedContent = [], prevContent } } = useContext(PageContext);

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
      await getRecomendation(dispatch, source, recomendedContent, prevContent, id, selectedGenre)
    }
  }

  const handleGenre = async (id: number) => {
    if (!fetching) {
      if (id === selectedGenre) {
        setSelectedGenre(dispatch, null)
        await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider)
      } else {
        setSelectedGenre(dispatch, id)
        await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, id)
      }
    }
  }

  return (
    <Box  margin="30px 0 0">
      <Providers device={device} handleFilter={handleFilter} />
      <Genres handleGenre={handleGenre} />
    </Box>
  )
}

export default memo(Filters);
