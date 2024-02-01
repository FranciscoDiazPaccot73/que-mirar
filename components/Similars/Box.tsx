import { FC, useContext, useState } from "react";

import Image from "next/image";

import { PageContext } from "@/context";
import {
  getContent,
  getSimilars,
  setSimilarToContent,
} from "@/context/actions";
import { ContentInterface } from "@/pages/types";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

type ContentBoxProps = {
  url: string;
  content: ContentInterface;
  source?: string;
};

const ContentBox: FC<ContentBoxProps> = ({ content, url, source }) => {
  const {
    dispatch,
    state: { watchRegion },
  } = useContext(PageContext);
  const [errorLoadingImage, setImageError] = useState(false);

  if (!content) return null;

  const {
    id,
    name,
    title,
    vote_average: vote,
    backdrop_path: backdropPath,
    overview,
  } = content;
  const boxClasses =
    "relative h-full flex flex-col items-center gap-2 cursor-pointer mb-4 md:mb-6 md:hover:scale-105 md:duration-200";

  const imageUrl = backdropPath;

  const handleLoadContent = async () => {
    if (id) {
      window.scrollTo(0, 0);
      setSimilarToContent(dispatch, content);
      await getContent(dispatch, source ?? "tv", id, watchRegion);
      await getSimilars(dispatch, source ?? "tv", id, watchRegion);
    }
  };

  return (
    <div
      className={boxClasses}
      title={overview ?? title}
      onClick={handleLoadContent}
    >
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
        <div className="h-10 w-10 absolute top-20 right-0">
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
      <p className="text-lg mt-1">{name || title}</p>
    </div>
  );
};

ContentBox.defaultProps = {
  source: "",
};

export default ContentBox;
