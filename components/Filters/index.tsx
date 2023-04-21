import { memo, useContext, useEffect } from 'react';

import { Box } from '@chakra-ui/react'
import Providers from './Providers';
import Genres from './Genres';

import { trackEvent } from '../../utils/trackers';

import { PageContext } from '../../context';
import { getProviders, getRecomendation, setProvider, getGenres, setSelectedGenre } from '../../context/actions';

interface Props {
  source: string,
  device?: string,
}

type provider = {
  display_priority: number,
  logo_path: string,
  provider_name: string,
  provider_id: number
}

type genre = {
  id: number,
  name: string,
}

const Filters = ({ source, device }: Props) => {
  const { dispatch, state: { watchRegion, genres, providers, selectedProvider = 0, selectedGenre = 0, fetching, recomendedContent = [], prevContent } } = useContext(PageContext);

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
      const prov = providers.find((p: provider) => p.provider_id === id);
      trackEvent('PROVIDER', prov.provider_name)
    }
  }

  const handleGenre = async (id: number) => {
    if (!fetching) {
      const genre = genres.find((g: genre) => g.id === id);
      if (id !== selectedGenre) {
        setSelectedGenre(dispatch, id)
        if (id === 0) {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, null, watchRegion)
          trackEvent('GENRE', `all`)
        } else {
          await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, id, watchRegion)
          trackEvent('GENRE', `${genre.name}`)
        }
      }
    }
  }

  return (
    <Box  margin="30px 0 0">
      <Providers device={device} handleFilter={handleFilter} />
      <Genres source={source} handleGenre={handleGenre} />
    </Box>
  )
}

export default memo(Filters);
