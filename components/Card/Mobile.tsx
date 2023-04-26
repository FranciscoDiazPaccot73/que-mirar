/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { Box, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import CardSkeleton from './Skeleton';

import { trackEvent } from '../../utils/trackers';
import { PageContext } from '../../context';
import { formatDuration } from '../../utils';

import styles from '../../styles/Home.module.scss';

export interface Props {
  source: string;
}

const Mobile = ({ source }: Props) => {
  const {
    state: { content, BASE_IMAGE_URL },
  } = useContext(PageContext);

  return (
    <>
      {content ? (
        <Link passHref href={content?.link ?? '/'} onClick={() => trackEvent('MOVIE', content.title)}>
          <Box className={styles.poster}>
            <Image
              priority
              alt={content.title}
              blurDataURL={`${BASE_IMAGE_URL}${content.backdrop_path}`}
              height={281}
              placeholder="blur"
              src={`${BASE_IMAGE_URL}${content.backdrop_path}`}
              width={500}
            />
            <Box className={styles.poster_content}>
              <Text className={styles.poster_title} fontSize="xl">
                <span>
                  {content.title}
                  {source === 'movie' ? (
                    <Text className={styles.poster_release} style={{ fontSize: '12px' }}>
                      {content.release_date.slice(0, 4)} &bull; {formatDuration(content.duration)}
                    </Text>
                  ) : null}
                  <Box alignItems="center" display="flex" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    {content.genres?.map((genre: any) => (
                      <Text key={genre.name} className={styles.genres} color="gray.200" fontSize="12px">
                        {genre.name}
                      </Text>
                    ))}
                  </Box>
                </span>
              </Text>
              <Box alignItems="center" display="flex" margin="12px 0" mt="2">
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <Box key={`mobile-star-${i}`}>
                      <StarIcon color={i < Math.floor(content.vote_average / 2) ? 'purple' : 'gray'} style={{ margin: '0 2px' }} />
                    </Box>
                  ))}
                <Box as="span" color="gray.600" fontSize="sm" ml="2">
                  {content.vote_count} reviews
                </Box>
              </Box>
              <Box overflow="hidden" textOverflow="ellipsis">
                <Text className={styles.poster_overview} fontSize="sm">
                  {content.overview}
                </Text>
              </Box>
              {content.providers?.length ? (
                <Box alignItems="center" display="flex" marginTop="20px">
                  <Text fontSize="sm">Disponible en:</Text>
                  {content.providers.map((prov: any) => (
                    <Box key={prov.id} borderRadius="6px" height="30px" margin="0 6px" overflow="hidden">
                      <Image alt={prov.provider_name} height={30} src={`${BASE_IMAGE_URL}${prov.logo_path}`} width={30} />
                    </Box>
                  ))}
                </Box>
              ) : null}
            </Box>
          </Box>
        </Link>
      ) : (
        <CardSkeleton device="mobile" />
      )}
    </>
  );
};

export default Mobile;
