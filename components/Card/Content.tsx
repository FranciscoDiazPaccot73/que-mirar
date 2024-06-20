/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FC, useContext, useEffect, useState } from "react";
import { ArrowRight, LineChart, Play } from "lucide-react";

import Skeleton from "../Skeleton";
import Genres from "./Genres";

import { PageContext } from "../../context";
import { formatDuration } from "../../utils";

import "react-circular-progressbar/dist/styles.css";
import { Rating } from "../Rating";
import { Share } from "../Share";
import { Button } from "../Button/Button";

type ContentProps = {
  source: string;
  nextRecomendation?: () => void;
  search: string;
};

const Content: FC<ContentProps> = ({ search, source, nextRecomendation }) => {
  const {
    state: { content, BASE_IMAGE_URL },
  } = useContext(PageContext);
  const [Element, setElement] = useState<any>("a");

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setElement("div");
    }
  }, []);

  if (!content) return <Skeleton type="card" />;

  const elementProps =
    Element === "a" ? { href: content?.link ?? "/", target: "_blank" } : {};
  const imageUrl =
    Element === "a"
      ? content?.backdrop_path
      : content?.poster_path || content?.backdrop_path;

  const pictureGradient =
    "after:from-[#1a202c] after:via-[#1a202c] after:w-full after:absolute after:content-['']";

  const handleNextRecomendation = () => {
    if (nextRecomendation) {
      nextRecomendation();
    }
  };

  const buttonProps = {
    onClick: search === "recomendations" ? handleNextRecomendation : () => {},
    href: search === "recomendations" ? undefined : "#other-trends",
    className: "gap-2",
  };

  return (
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
            {source === "movie" ? (
              <span className="text-xs opacity-60 mb-3 mt-1 flex gap-3">
                <p>{content?.release_date?.slice(0, 4)}</p>
                <p>{formatDuration(content?.duration)}</p>
                <Genres genres={content.genres} />
              </span>
            ) : (
              <span>
                <p
                  className={cn(
                    "text-xs opacity-60 mb-3 mt-1",
                    !content.seasons && "hidden"
                  )}
                >
                  {`${content.seasons} temporada${
                    content.seasons > 1 ? "s" : ""
                  }`}{" "}
                  &bull; {content?.lastEpisode?.slice(0, 4)}
                </p>
              </span>
            )}
            {content?.vote_average && (
              <Rating
                rating={content?.vote_average}
                reviews={content?.vote_count}
              />
            )}
          </p>
          <p className="hidden md:block text-gray-500 font-bold text-sm md:mt-2 md:mb-3">
            {content.tagline}
          </p>
          <div className="overflow-hidden text-ellipsis">
            <p className="text-sm text-ellipsis overflow-hidden text-gray-300 overview">
              {content.overview}
            </p>
          </div>
          <div className="flex mt-10 gap-6">
            {content.link && content.providers?.length ? (
              <div className="ml-4 hidden first-line:hidden md:flex">
                <a
                  className="w-10 h-10"
                  href={content.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Button
                    className="w-10 h-10 rounded-full"
                    size="sm"
                    title="¡Quiero verla!"
                    variant="site"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            ) : null}
            {content.providers?.length ? (
              <div className="grid grid-cols-4 text-gray-300">
                {content.providers.map((prov: any) => (
                  <div
                    key={`provider-${prov.d}`}
                    className="rounded-md h-10 mx-2 mb-2 overflow-hidden"
                  >
                    <Image
                      alt={prov.provider_name}
                      height={40}
                      src={`${BASE_IMAGE_URL}${prov.logo_path}`}
                      width={40}
                    />
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
        <div className="hidden md:flex md:gap-2 absolute bottom-3 justify-start w-full my-3 left-6">
          <Share />
          <Button {...buttonProps} variant="site-transparent">
            {search === "recomendations"
              ? "Ver siguiente recomendación"
              : "Ver otras tendencias"}
            {search === "recomendations" ? (
              <ArrowRight className="w-5 h-5" />
            ) : (
              <LineChart className="w-5 h-5" />
            )}
          </Button>
        </div>
      </section>
    </Element>
  );
};

Content.defaultProps = {
  nextRecomendation: () => {},
};

export default Content;
