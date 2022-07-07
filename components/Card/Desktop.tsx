import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";

import { Box, Button, Text, Skeleton, SkeletonText } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import CardSkeleton from "./Skeleton";

import { PageContext } from '../../context';
import { trackEvent } from "../../utils/trackers";

import styles from '../../styles/Home.module.scss'

export interface Props {
  source: string,
  nextRecomendation?(): void,
}

const Desktop = ({ source, nextRecomendation }: Props) => {
  const { state: { content, fetching, BASE_IMAGE_URL } } = useContext(PageContext);

  return (
    <>
    {content ? (
        <Box position="relative" className={styles.poster} maxHeight="950px" display="flex">
          <Image
            src={`${BASE_IMAGE_URL}${content.poster_path}`}
            alt={content.title}
            width='500px'
            height='281px'
            placeholder='blur'
            blurDataURL={`${BASE_IMAGE_URL}${content.poster_path}`}
          />
          <Box width="80%" padding="30px 30px 74px">
            <Text fontSize="28px">
              <Text display="flex" alignItems="center">{content.title}</Text>
            </Text>
            <Box display="flex">
              <Box display="flex" alignItems="center">
                {content.genres?.map((genre: any) => <Text key={genre.name} className={styles.genres} fontSize="12px" color="gray.200">{genre.name}</Text>)}
                {source === 'movie' ? <span style={{ fontSize: "12px" }} className={styles.poster_release}>&bull; {content.release_date.slice(0, 4)}</span> : null}
              </Box>
            </Box>
            <Box margin="12px 0" display='flex' mt='2' alignItems='center'>
              {Array(5).fill('').map((_, i) => (
                <Box key={`desktop-star-${i}`}>
                  <StarIcon
                    style={{ margin: '0 2px' }}
                    color={i < Math.floor(content.vote_average / 2) ? 'purple' : 'gray'}
                  />
                </Box>
              ))}
              <Box marginTop="3px" as='span' ml='2' color='gray.600' fontSize='sm'>
                {content.vote_count} reviews
              </Box>
            </Box>
            <Text margin="6px 0 12px" fontSize="14px" color="gray.400">
              {content.tagline}
            </Text>
            <Box>
              <Text fontSize="sm" className={styles.poster_overview_desktop} title={content.overview}>{content.overview}</Text>
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
            ) : (
              <Text marginTop="24px" color="gray.500" fontWeight={600} fontSize="sm">Puede que este contenido no este disponible en tu región</Text>
            )}
          </Box>
          <Box
            position="absolute"
            margin="10px 0"
            width="100%"
            display="flex"
            justifyContent="flex-end"
            bottom="10px"
            right="30px"
          >
            <Button
              onClick={nextRecomendation}
              disabled={fetching}
              size="sm"
              colorScheme='purple'
              variant='ghost'
            >
              Ver siguiente recomendación
            </Button>
            {content.link ? (
              <Link href={content.link} passHref onClick={() => trackEvent('MOVIE', content.title)}>
                <Button
                  disabled={fetching}
                  size="sm"
                  colorScheme='purple'
                  marginLeft="16px"
                >
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
  )
}

export default Desktop;
