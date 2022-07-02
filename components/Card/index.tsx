import React, { useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import { Box } from '@chakra-ui/react'

import Mobile from './Mobile';
import Desktop from './Desktop';

import { PageContext } from '../../context';
import { setContent, setRecomended, getInfo } from '../../context/actions';

import styles from '../../styles/Home.module.scss'

interface Props {
  source: string,
  device: string|null,
}

const Card = ({ source, device }: Props) => {
  const { dispatch } = useContext(PageContext);
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch(`/api?source=${source}`).then(res =>
      res.json()
    )
  )

  useEffect(() => {
    if (data) {
      setContent(dispatch, data)
      setRecomended(dispatch, data.id)
    }

    if (error) {
      getInfo(dispatch, source);
    }
  }, [isLoading])

  const boxProps = {
    borderWidth: '1px',
    borderRadius: 'lg',
    overflow: 'hidden',
    borderColor: 'purple.500',
    width: '100%',
    display: 'flex',
    minHeight: "400px",
  }

  if (device === 'mobile') {
    return (
      <Box {...boxProps}>
        <Mobile styles={styles} source={source} />
      </Box>
    )
  }

  return (
    <Box {...boxProps}>
      <Desktop styles={styles} source={source} />
    </Box>
  )
}

export default Card;
