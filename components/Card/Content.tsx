import { useContext, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// import { StarIcon } from '@chakra-ui/icons';
import CardSkeleton from './Skeleton';

import { PageContext } from '../../context';
import { formatDuration } from '../../utils';

type ContentProps = {
  source: string;
}

// TODO ICON

const Content: FC<ContentProps> = ({ source }) => {
  const { state: { content, BASE_IMAGE_URL } } = useContext(PageContext);
  console.log(content)

  return (
    <>
      {content ? (
        <Link passHref href={content?.link ?? '/'}>
          <section className='min-h-[430px] max-h-[950px] relative w-full'>
            <Image
              priority
              alt={content.title}
              blurDataURL={`${BASE_IMAGE_URL}${content.backdrop_path}`}
              height={281}
              placeholder="blur"
              src={`${BASE_IMAGE_URL}${content.backdrop_path}`}
              width={500}
            />
            <div className='px-4 pt-2 pb-3'>
            {/*
              <p className={styles.poster_title} fontSize="xl">
                <span>
                  {content.title}
                  {source === 'movie' ? (
                    <p className={styles.poster_release} style={{ fontSize: '12px' }}>
                      {content.release_date.slice(0, 4)} &bull; {formatDuration(content.duration)}
                    </p>
                  ) : null}
                  <div alignItems="center" display="flex" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    {content.genres?.map((genre: any) => (
                      <p key={genre.name} className={styles.genres} color="gray.200" fontSize="12px">
                        {genre.name}
                      </p>
                    ))}
                  </div>
                </span>
              </p>
              <div alignItems="center" display="flex" margin="12px 0" mt="2">
                {Array(5)
                  .fill('')
                  .map((_, i) => (
                    <div key={`mobile-star-${i}`}>
                      <StarIcon color={i < Math.floor(content.vote_average / 2) ? 'purple' : 'gray'} style={{ margin: '0 2px' }} />
                    </div>
                  ))}
                <div as="span" color="gray.600" fontSize="sm" ml="2">
                  {content.vote_count} reviews
                </div>
              </div>
              <div overflow="hidden" textOverflow="ellipsis">
                <p className={styles.poster_overview} fontSize="sm">
                  {content.overview}
                </p>
              </div>
              {content.providers?.length ? (
                <div alignItems="center" display="flex" marginTop="20px">
                  <p fontSize="sm">Disponible en:</p>
                  {content.providers.map((prov: any) => (
                    <div key={prov.id} borderRadius="6px" height="30px" margin="0 6px" overflow="hidden">
                      <Image alt={prov.provider_name} height={30} src={`${BASE_IMAGE_URL}${prov.logo_path}`} width={30} />
                    </div>
                  ))}
                </div>
              ) : null}
            */}
            </div>
          </section>
        </Link>
      ) : (null
        )}
    </>
  );
};

// <CardSkeleton device="mobile" />
export default Content;
