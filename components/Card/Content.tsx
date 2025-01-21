/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FC, useContext, useEffect, useState } from "react";
import { ArrowRight, LineChart, Play } from "lucide-react";

import Skeleton from "../Skeleton";
import Genres from "./Genres";

import { PageContext } from "../../context";
import { formatDuration, isTextClamped } from "../../utils";

import "react-circular-progressbar/dist/styles.css";
import { Rating } from "../Rating";
import { Share } from "../Share";
import { Button } from "../Button/Button";
import { GteInfo } from "./GteInfo";

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
  const [showSeeMore, setSeeMore] = useState<boolean>(false);
  const [showAllText, setShowAllText] = useState<boolean>(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setElement("div");
    }
  }, []);

  useEffect(() => {
    if (content) {
      const elm = document.getElementById("overview");

      if (Element === "a") {
        setSeeMore(false);
      } else if (elm && isTextClamped(elm)) {
        setSeeMore(true);
      }
    }
  }, [content, Element]);

  if (!content) return <Skeleton type="card" />;

  const elementProps =
    Element === "a" ? { href: content?.link ?? "/", target: "_blank" } : {};
  const imageUrl =
    Element === "a"
      ? content?.backdrop_path
      : content?.poster_path || content?.backdrop_path;

  // const pictureGradient =
  //   "after:from-[#1a202c] after:via-[#1a202c] after:w-full after:absolute after:content-['']";

  const handleNextRecomendation = () => {
    if (nextRecomendation) {
      setSeeMore(false);
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
      <section className="min-h-[620px] max-h-[620px] md:min-h-[430px] md:max-h-[950px] relative w-full overflow-hidden md:flex md:relative">
        <div className="relative min-h-[240px] max-h-[240px] md:mr-3 md:min-h-[550px] md:max-h-[550px] md:min-w-[346px] md:w-full after:h-10 after:bg-gradient-to-t after:left-0 after:-bottom-2 md:after:w-9/10 md:after:h-full md:after:bg-gradient-to-r md:after:bottom-0">
          <Image
            priority
            alt={content.title ?? content.name}
            blurDataURL={`${BASE_IMAGE_URL}${imageUrl}`}
            className="md:h-full md:w-2/5 md:ml-auto md:rounded"
            height={500}
            placeholder="blur"
            src={`${BASE_IMAGE_URL}${imageUrl}`}
            width={600}
          />
        </div>
        <div className="px-4 pt-2 pb-3 md:pt-2 md:w-3/5 md:pr-8 md:pl-3 md:mb-16 md:absolute md:left-0">
          <p className="mb-3 text-3xl text-white md:text-4xl md:mb-6">
            {content.title ?? content.name}
            <div className="flex gap-2 items-center text-xs mb-3 mt-1">
              {content.certification && (
                <GteInfo value={content.certification} />
              )}
              {source === "movie" ? (
                <span className="opacity-60 flex gap-3">
                  <p>{content?.release_date?.slice(0, 4)}</p>
                  <p>{formatDuration(content?.duration)}</p>
                  <Genres genres={content.genres} />
                </span>
              ) : (
                <span>
                  <p
                    className={cn("opacity-60 ", !content.seasons && "hidden")}
                  >
                    {`${content.seasons} temporada${
                      content.seasons > 1 ? "s" : ""
                    }`}{" "}
                    &bull; {content?.lastEpisode?.slice(0, 4)}
                  </p>
                </span>
              )}
            </div>
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
          <p
            className={cn(
              "text-sm overflow-scroll max-h-[185px] text-gray-300 md:line-clamp-[10] md:max-h-[200px]",
              showAllText && "line-clamp-none overflow-scroll"
            )}
            id="overview"
            title={content.overview}
          >
            {content.overview}
          </p>
          {showSeeMore ? (
            <div className="w-full hidden justify-end md:flex">
              <Button
                className="mt-2 text-xs"
                size="sm"
                variant="site-transparent"
                onClick={() => setShowAllText(!showAllText)}
              >
                {showAllText ? "Ver menos" : "Ver más"}
              </Button>
            </div>
          ) : null}
          <div
            className={cn("flex gap-6 mt-10", showSeeMore && "mt-10 md:mt-4")}
          >
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
