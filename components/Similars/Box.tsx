import { FC, useContext, useState } from "react";
import Image from "next/image";
import { CarouselItem } from "@/components/ui/carousel";

import { PageContext } from "@/context";
import {
  getContent,
  getSimilars,
  setSimilarToContent,
} from "@/context/actions";
import { ContentInterface } from "@/pages/types";
import { cn } from "@/lib/utils";
import { updateParams } from "@/utils";
import { Card, CardContent } from "../ui/card";
import { Rating } from "../Rating";

type ContentBoxProps = {
  url: string;
  content: ContentInterface;
  source?: string;
  customAction?: () => void;
  basis?: string;
};

const ContentBox: FC<ContentBoxProps> = ({
  content,
  url,
  source,
  customAction,
  basis = "md:basis-1/3 lg:basis-1/4",
}) => {
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
    "relative h-full flex flex-col items-center gap-2 cursor-pointer mb-8 md:mt-3",
    basis
  );

  const imageUrl = backdropPath;

  const handleLoadContent = async () => {
    if (customAction) customAction();
    if (id) {
      window.scrollTo(0, 0);
      setSimilarToContent(dispatch, content);
      if (!customAction) {
        updateParams({
          newSource: source!,
          newWatchRegion: watchRegion,
          id: id.toString(),
        });
      }
      await getContent(dispatch, source ?? "tv", id, watchRegion);
      await getSimilars(dispatch, source ?? "tv", id, watchRegion);
    }
  };

  return (
    <CarouselItem
      className={boxClasses}
      title={overview ?? title}
      onClick={handleLoadContent}
    >
      <Card className="h-[260px] bg-transparent border-purple-50 overflow-hidden">
        <CardContent className="flex flex-col p-0 h-full">
          <Image
            alt={overview ?? title}
            blurDataURL={`${url}${backdropPath}`}
            className="md:hover:scale-105 md:duration-200"
            height={120}
            placeholder="blur"
            src={errorLoadingImage ? "/not-image.png" : `${url}${imageUrl}`}
            width={190}
            onError={() => setImageError(true)}
          />
        </CardContent>
      </Card>
      {vote ? (
        <div className="h-6 absolute -bottom-8 left-1/2 -translate-x-1/2">
          <Rating rating={vote} />
        </div>
      ) : null}
    </CarouselItem>
  );
};

ContentBox.defaultProps = {
  source: "",
};

export default ContentBox;
