import Image from 'next/image';
import { FC, useContext, useEffect, useState } from 'react';

import Button from '../Button';
import Skeleton from '../Skeleton';
import Genres from './Genres';

import { PageContext } from '../../context';
import { formatDuration } from '../../utils';

type ContentProps = {
  source: string;
  nextRecomendation?: () => void;
};

const Content: FC<ContentProps> = ({ source, nextRecomendation }) => {
  const {
    state: { content, BASE_IMAGE_URL, fetching },
  } = useContext(PageContext);
  const [Element, setElement] = useState<any>('a');

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setElement('div');
    }
  }, []);

  const elementProps = Element === 'a' ? { href: content?.link ?? '/', target: '_blank' } : {};
  const imageUrl = Element === 'a' ? content?.backdrop_path : content?.poster_path || content?.backdrop_path;

  return (
    <>
      {content ? (
        <Element {...elementProps}>
          <section className="min-h-[430px] max-h-[950px] relative w-full overflow-hidden md:flex">
            <div className="max-w-[346px] max-h-[500px] md:min-h-[500px] md:max-h-full md:min-w-[346px]">
              <Image
                priority
                alt={content.title ?? content.name}
                blurDataURL={`${BASE_IMAGE_URL}${imageUrl}`}
                className="md:min-h-full"
                height={281}
                placeholder="blur"
                src={`${BASE_IMAGE_URL}${imageUrl}`}
                width={500}
              />
            </div>
            <div className="px-4 pt-2 pb-3 md:w-4/5 md:px-8 md:mt-8 md:mb-16">
              <p className="mb-2 text-2xl text-white md:text-3xl">
                {content.title ?? content.name}
                {source === 'movie' ? (
                  <span>
                    <p className="text-xs opacity-60 mb-3">
                      {content?.release_date?.slice(0, 4)} &bull; {formatDuration(content?.duration)}
                    </p>
                  </span>
                ) : null}
              </p>
              <div className="flex items-center mb-4">
                <p className="text-slate-400 text-xs">
                  {!content.genres && content.genre_ids && <Skeleton type="genres-card" />}
                  <Genres genres={content.genres} />
                </p>
                <div className="flex flex-col items-end mb-3 w-full md:my-0">
                  <p className="text-purple ml-auto">{content?.vote_average?.toFixed(2)} / 10</p>
                  <p className="ml-2 text-gray-500 text-xs md:text-sm">{content?.vote_count} reviews</p>
                </div>
              </div>
              <p className="hidden md:block text-gray-500 font-bold text-sm md:mt-2 md:mb-3">{content.tagline}</p>
              <div className="overflow-hidden text-ellipsis">
                <p className="text-sm text-ellipsis overflow-hidden text-gray-300 overview">{content.overview}</p>
              </div>
              {content.providers?.length ? (
                <div className="flex items-center mt-5 text-gray-300">
                  <p className="text-sm">Disponible en:</p>
                  {content.providers.map((prov: any) => (
                    <div key={prov.id} className="rounded-md h-8 mx-2 overflow-hidden">
                      <Image alt={prov.provider_name} height={30} src={`${BASE_IMAGE_URL}${prov.logo_path}`} width={30} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="hidden md:block text-gray-400 text-sm font-semibold mt-6">
                  Puede que este contenido no este disponible en tu región
                </p>
              )}
            </div>
            <div className="hidden md:flex absolute bottom-3 justify-end w-full my-3 right-8">
              <Button
                disabled={fetching}
                label="Ver siguiente recomendación"
                size="sm"
                variant="transparent"
                onClick={nextRecomendation ?? (() => {})}
              />
              {content.link ? (
                <a className="ml-4" href={content.link} rel="noreferrer" target="_blank">
                  <Button disabled={fetching} label="¡Quiero verla!" size="sm" onClick={() => {}} />
                </a>
              ) : null}
            </div>
          </section>
        </Element>
      ) : (
        <Skeleton type="card" />
      )}
    </>
  );
};

Content.defaultProps = {
  nextRecomendation: () => {},
};

export default Content;
