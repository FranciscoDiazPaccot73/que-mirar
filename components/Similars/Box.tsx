import { FC, useContext, useState } from "react";
import Image from "next/image";
import { CarouselItem } from "@/components/ui/carousel"

import { PageContext } from "@/context";
import {
  getContent,
  getSimilars,
  setSimilarToContent,
} from "@/context/actions";
import { ContentInterface } from "@/pages/types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";

type ContentBoxProps = {
  url: string;
  content: ContentInterface;
  source?: string;
  customAction?: () => void
  basis?: string
};

const ContentBox: FC<ContentBoxProps> = ({ content, url, source, customAction, basis = "md:basis-1/3 lg:basis-1/4" }) => {
  const {
    dispatch,
    state: { watchRegion },
  } = useContext(PageContext);
  const [errorLoadingImage, setImageError] = useState(false);

  if (!content) return null;

  const {
    id,
    title,
    vote_average: vote,
    poster_path: backdropPath,
    overview,
  } = content;
  const boxClasses = cn(
    "relative h-full flex flex-col items-center gap-2 cursor-pointer mb-4 md:my-3 md:hover:scale-105 md:duration-200",
    basis
  )

  const imageUrl = backdropPath;

  const handleLoadContent = async () => {
    if (customAction) customAction()
    if (id) {
      window.scrollTo(0, 0);
      setSimilarToContent(dispatch, content);
      await getContent(dispatch, source ?? "tv", id, watchRegion);
      await getSimilars(dispatch, source ?? "tv", id, watchRegion);
    }
  };

  return (
    <CarouselItem className={boxClasses} title={overview ?? title} onClick={handleLoadContent}>
      <Card className="h-[260px] bg-transparent border-purple overflow-hidden">
        <CardContent className="flex flex-col p-0 h-full">
          <Image
            alt={overview ?? title}
            blurDataURL={`${url}${backdropPath}`}
            height={120}
            placeholder="blur"
            src={errorLoadingImage ? "/not-image.png" : `${url}${imageUrl}`}
            width={190}
            onError={() => setImageError(true)}
          />
          {vote ? (
            <div className="h-14 w-14 absolute -bottom-4 left-12 md:-bottom-1 md:left-8">
              <CircularProgressbar
                background
                maxValue={10}
                strokeWidth={10}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#B794F4",
                  textColor: "#B794F4",
                  trailColor: "#B794F412",
                  backgroundColor: "#1a202c",
                })}
                text={`${vote.toFixed(2)}`}
                value={vote}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </CarouselItem>
  )
};

ContentBox.defaultProps = {
  source: "",
};

export default ContentBox;
