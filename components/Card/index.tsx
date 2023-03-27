import React, { useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import dynamic from 'next/dynamic';
import { Box } from '@chakra-ui/react'

import NoContent from '../icons/NoData';

import { PageContext } from '../../context';

const Mobile = dynamic(() => import('./Mobile'));
const Desktop = dynamic(() => import('./Desktop'));

interface Props {
  source: string,
  device: string|null,
  nextRecomendation?(): void,
  contentId?: string | null,
}

const Card = ({ source, device, nextRecomendation }: Props) => {
  const { state: { noContent } } = useContext(PageContext);

  const boxProps = {
    borderWidth: '1px',
    borderRadius: 'lg',
    overflow: 'hidden',
    borderColor: 'purple.500',
    width: '100%',
    display: 'flex',
    minHeight: "400px",
  }

  if (noContent || !device) {
    return (
      <Box {...boxProps} maxHeight="500px" padding="16px">
        <NoContent height='400px' width='100%'/>
      </Box>
    )
  }

  if (device === 'mobile') {
    return (
      <Box {...boxProps}>
        <Mobile source={source} />
      </Box>
    )
  }

  return (
    <Box {...boxProps} minHeight="500px">
      <Desktop nextRecomendation={nextRecomendation} source={source} />
    </Box>
  )
}

export default Card;
