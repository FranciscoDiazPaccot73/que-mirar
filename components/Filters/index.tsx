import { memo, useContext, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import { Box, Text, Skeleton } from '@chakra-ui/react'

import { PageContext } from '../../context';
import { getProviders, getRecomendation, setProvider } from '../../context/actions';

import styles from './styles.module.scss';

interface Props {
  source: string,
  device: string|null,
}

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const Filters = ({ source, device }: Props) => {
  const { dispatch, state: { selectedProvider = 0, providers, fetching, recomendedContent = [], prevContent } } = useContext(PageContext);
  const allFilters = classNames(styles.filters__all, selectedProvider !== 0 && styles.filters__all_disabled);

  const getPageProviders = async () => {
    await getProviders(dispatch, source);
  }

  useEffect(() => {
    if (source) getPageProviders();
  }, []);

  const handleFilter = async (id: number) => {
    if (!fetching && id !== selectedProvider) {
      setProvider(dispatch, id)
      await getRecomendation(dispatch, source, recomendedContent, prevContent, id)
    }
  }

  return (
    <Box  margin="30px 0 0">
      <Text fontSize="10px">Se priorizará en tu búsqueda la plataforma de streaming que elijas</Text>
      <Box
        width="100%"
        display="flex"
        justifyContent={device === 'mobile' ? "center" : 'inherit'}
        marginTop="12px"
      >
        {providers?.length ? (
          <>
            <Box cursor="pointer" onClick={() => handleFilter(0)} className={allFilters}>
              <Text textAlign="center" fontSize="10px">TODAS</Text>
            </Box>
            {providers.map((prov: any) => {
              const filtersClasses = classNames(styles.filters__provider, selectedProvider !== prov.provider_id && styles.disabled);

              return (
                <Box cursor="pointer" key={prov.provider_id} onClick={() => handleFilter(prov.provider_id)} className={filtersClasses}>
                  <Image alt={prov.provider_name} src={`${BASE_IMAGE_URL}${prov.logo_path}`} height='40px' width="40px" />
                </Box>
              )
            })}
          </>
        ) : (
          <>
            <Skeleton height='35px' width="35px" marginRight="10px" />
            <Skeleton height='35px' width="35px" marginRight="10px" />
            <Skeleton height='35px' width="35px" marginRight="10px" />
            <Skeleton height='35px' width="35px" marginRight="10px" />
          </>
        )}
      </Box>
    </Box>
  )
}

export default memo(Filters);
