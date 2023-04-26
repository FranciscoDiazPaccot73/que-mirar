/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/require-default-props */
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';

import { Box, Button, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import CardSkeleton from './Skeleton';

import { PageContext } from '../../context';
import { trackEvent } from '../../utils/trackers';
import { formatDuration } from '../../utils';

import styles from '../../styles/Home.module.scss';

export interface Props {
  source: string;
  nextRecomendation?(): void;
}

const Desktop = ({ source, nextRecomendation }: Props) => {
  const {
    state: { content, fetching, BASE_IMAGE_URL },
  } = useContext(PageContext);
  const imageUrl = content?.poster_path || content?.backdrop_path;

  return (
    <>
      {content ? (
        <Box className={styles.poster} display="flex" maxHeight="950px" position="relative">
          <Image
            priority
            alt={content.title}
            blurDataURL={`${BASE_IMAGE_URL}${content.poster_path}`}
            height={281}
            placeholder="blur"
            src={`${BASE_IMAGE_URL}${imageUrl}`}
            width={500}
          />
          <Box padding="30px 30px 74px" width="80%">
            <Text fontSize="28px">
              <Text alignItems="center" display="flex">
                {content.title}
              </Text>
            </Text>
            <Box>
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
            </Box>
            <Box alignItems="center" display="flex" margin="12px 0" mt="2">
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <Box key={`desktop-star-${i}`}>
                    <StarIcon color={i < Math.floor(content.vote_average / 2) ? 'purple' : 'gray'} style={{ margin: '0 2px' }} />
                  </Box>
                ))}
              <Box as="span" color="gray.600" fontSize="sm" marginTop="3px" ml="2">
                {content.vote_count} reviews
              </Box>
            </Box>
            <Text color="gray.400" fontSize="14px" margin="6px 0 12px">
              {content.tagline}
            </Text>
            <Box>
              <Text className={styles.poster_overview_desktop} fontSize="sm" title={content.overview}>
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
            ) : (
              <Text color="gray.500" fontSize="sm" fontWeight={600} marginTop="24px">
                Puede que este contenido no este disponible en tu región
              </Text>
            )}
          </Box>
          <Box bottom="10px" display="flex" justifyContent="flex-end" margin="10px 0" position="absolute" right="30px" width="100%">
            <Button colorScheme="purple" disabled={fetching} size="sm" variant="ghost" onClick={nextRecomendation}>
              Ver siguiente recomendación
            </Button>
            {content.link ? (
              <Link passHref href={content.link} onClick={() => trackEvent('MOVIE', content.title)}>
                <Button colorScheme="purple" disabled={fetching} marginLeft="16px" size="sm">
                  ¡Quiero verla!
                </Button>
              </Link>
            ) : null}
          </Box>
        </Box>
      ) : (
        <CardSkeleton />
      )}
    </>
  );
};

export default Desktop;
