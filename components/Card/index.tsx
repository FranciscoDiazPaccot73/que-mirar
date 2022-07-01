import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { Box, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';

import { PageContext } from '../../context';
import { setContent, setRecomended, getInfo } from '../../context/actions';

import styles from '../../styles/Home.module.scss'

interface Props {
  source: string,
}

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const Card = ({ source }: Props) => {
  const { state: { content }, dispatch } = useContext(PageContext);
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

  return (
    <Box {...boxProps}>
      {content ? (
        <Link href={content?.link ?? '/'} passHref>
          <div className={styles.poster}>
            <Image
              src={`${BASE_IMAGE_URL}${content.backdrop_path}`}
              alt={content.title}
              width='500px'
              height='281px'
              placeholder='blur'
              blurDataURL={`${BASE_IMAGE_URL}${content.backdrop_path}`}
            />
            <div className={styles.poster_content}>
              <Text className={styles.poster_title} fontSize="xl">
                <span>{content.title}{source === 'movie' ? <span className={styles.poster_release}>&bull; {content.release_date.slice(0, 4)}</span> : null}</span>
              </Text>
              <Box margin="12px 0" display='flex' mt='2' alignItems='center'>
                {Array(5).fill('').map((_, i) => (
                  <Box key={i}>
                    <StarIcon
                      style={{ margin: '0 2px' }}
                      color={i < Math.floor(content.vote_average / 2) ? 'purple' : 'gray'}
                    />
                  </Box>
                ))}
                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                  {content.vote_count} reseñas
                </Box>
              </Box>
              <Box maxHeight="168px" overflow="hidden" textOverflow="ellipsis">
                <Text className={styles.poster_overview} fontSize="sm">{content.overview}</Text>
              </Box>
              {content.providers?.length ? (
                <Box display="flex" alignItems="center" marginTop="20px">
                  <Text fontSize="sm">Disponible en:</Text>
                  {content.providers.map((prov: any) =>
                    <Box key={prov.id} overflow="hidden" borderRadius="6px" height="30px" margin='0 6px'>
                      <Image alt={prov.provider_name} src={`${BASE_IMAGE_URL}${prov.logo_path}`} width="30px" height="30px" />
                    </Box>
                  )}
                </Box>
              ) : null}
            </div>
          </div>
        </Link>
      ) : (
        <Box width="100%">
          <Skeleton height='182px' />
          <div className={styles.poster_content}>
            <Skeleton height='30px' />
            <Skeleton height='21px' margin="8px 0 12px" />
            <SkeletonText mt='4' noOfLines={4} spacing='4' />
          </div>
        </Box>
      )}
    </Box>
  )
}

export default Card;
