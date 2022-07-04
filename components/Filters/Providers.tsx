import { useContext } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { Box, Text, Skeleton } from '@chakra-ui/react'

import { PageContext } from '../../context';

import styles from './styles.module.scss';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

interface Props {
  handleFilter: any,
  device: string|null,
}

const Providers = ({ handleFilter, device }: Props) => {
  const { state: { selectedProvider = 0, providers } } = useContext(PageContext);
  const allFilters = classNames(styles.filters__all, selectedProvider !== 0 && styles.filters__all_disabled);

  return (
    <Box marginBottom="30px">
      <Text fontSize="12px">Filtrar por plataforma de streaming</Text>
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

export default Providers;
