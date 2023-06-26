import Image from 'next/image';
import { FC, useContext, useEffect, useState } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Button from '../Button';
import Skeleton from '../Skeleton';
import Genres from './Genres';

import { PageContext } from '../../context';
import { formatDuration } from '../../utils';

import 'react-circular-progressbar/dist/styles.css';

type ContentProps = {
  source: string;
  nextRecomendation?: () => void;
  search: string;
};

const Content: FC<ContentProps> = ({ search, source, nextRecomendation }) => {
  const {
    state: { content, BASE_IMAGE_URL },
  } = useContext(PageContext);
  const [Element, setElement] = useState<any>('a');

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setElement('div');
    }
  }, []);

  const elementProps = Element === 'a' ? { href: content?.link ?? '/', target: '_blank' } : {};
  const imageUrl = Element === 'a' ? content?.backdrop_path : content?.poster_path || content?.backdrop_path;

  const pictureGradient = "after:from-[#1a202c] after:via-[#1a202c] after:w-full after:absolute after:content-['']";

  const handleNextRecomendation = () => {
    if (nextRecomendation) {
      window.scrollTo(0, 0);
      nextRecomendation();
    }
  };

  return (
    <>
      {content ? (
        <Element {...elementProps} className="w-full">
          <section className="min-h-[430px] max-h-[950px] relative w-full overflow-hidden md:flex md:relative">
            <div
              className={`relative max-h-[500px] md:min-h-[500px] md:max-h-[700px] md:min-w-[346px] md:w-full ${pictureGradient} after:h-10 after:bg-gradient-to-t after:left-0 after:-bottom-2 md:after:w-9/10 md:after:h-full md:after:bg-gradient-to-r md:after:bottom-0`}
            >
              <Image
                priority
                alt={content.title ?? content.name}
                blurDataURL={`${BASE_IMAGE_URL}${imageUrl}`}
                className="md:h-full md:w-3/5 md:ml-auto"
                height={500}
                placeholder="blur"
                src={`${BASE_IMAGE_URL}${imageUrl}`}
                width={800}
              />
            </div>
            <div className="px-4 pt-2 pb-3 md:pt-2 md:w-3/5 md:px-8 md:mt-8 md:mb-16 md:absolute md:left-0">
              <p className="mb-3 text-3xl text-white md:text-4xl md:mb-6">
                {content.title ?? content.name}
                {source === 'movie' ? (
                  <span>
                    <p className="text-xs opacity-60 mb-3 mt-1">
                      {content?.release_date?.slice(0, 4)} &bull; {formatDuration(content?.duration)}
                    </p>
                  </span>
                ) : null}
              </p>
              <div className="grid grid-cols-7.3 gap-2 items-center mb-5">
                <p className="text-slate-400 text-xs">
                  {!content.genres && content.genre_ids && <Skeleton type="genres-card" />}
                  <Genres genres={content.genres} />
                </p>
              </div>
              <p className="hidden md:block text-gray-500 font-bold text-sm md:mt-2 md:mb-3">{content.tagline}</p>
              <div className="overflow-hidden text-ellipsis">
                <p className="text-sm text-ellipsis overflow-hidden text-gray-300 overview">{content.overview}</p>
              </div>
              <div className="flex mt-10 gap-6">
                <div className="flex items-center flex-col gap-2">
                  <div className="h-16 w-16">
                    <CircularProgressbar
                      maxValue={10}
                      strokeWidth={10}
                      styles={buildStyles({
                        textSize: '18px',
                        pathColor: '#B794F4',
                        textColor: '#B794F4',
                        trailColor: '#B794F412',
                      })}
                      text={`${content?.vote_average.toFixed(2)}`}
                      value={content?.vote_average}
                    />
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm">{content?.vote_count} reviews</p>
                </div>
                {content.providers?.length ? (
                  <div className="grid grid-cols-4 text-gray-300">
                    {content.providers.map((prov: any) => (
                      <div key={prov.id} className="rounded-md h-10 mx-2 mb-2 overflow-hidden">
                        <Image alt={prov.provider_name} height={40} src={`${BASE_IMAGE_URL}${prov.logo_path}`} width={40} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="hidden md:block text-gray-400 text-sm font-semibold mt-6">
                    Puede que este contenido no este disponible en tu región
                  </p>
                )}
              </div>
            </div>
            <div className="hidden md:flex absolute bottom-3 justify-start w-full my-3 left-6">
              {content.link ? (
                <a className="ml-4" href={content.link} rel="noreferrer" target="_blank">
                  <Button label="¡Quiero verla!" size="sm" onClick={() => {}} />
                </a>
              ) : null}
              {search === 'recomendations' && (
                <Button
                  label="Ver siguiente recomendación"
                  size="sm"
                  variant="transparent"
                  onClick={handleNextRecomendation ?? (() => {})}
                />
              )}
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
