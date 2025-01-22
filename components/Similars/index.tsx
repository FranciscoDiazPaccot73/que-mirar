import { FC, useContext, useRef } from "react";
import dynamic from "next/dynamic";

import { ContentInterface } from "@/pages/types";

import { PageContext } from "@/context";
import { getMoreTrendings } from "@/context/actions";
import { SectionWrapper } from "../SectionWrapper/SectionWrapper";

const Carousel = dynamic(() =>
  import("./Carousel").then((mod) => mod.CarouselComponent)
);

type SimilarsProps = {
  url: string;
  content: ContentInterface[];
  source: string;
  search: string;
};

const Similars: FC<SimilarsProps> = ({ url, content, source, search }) => {
  const {
    dispatch,
    state: { fetching, selectedTimeframe = "day" },
  } = useContext(PageContext);
  const page = useRef(1);
  const deviceName = source === "movie" ? "Peliculas" : "Series";
  const sortedContent = content?.sort(
    (a: ContentInterface, b: ContentInterface) => b.popularity - a.popularity
  );
  const text =
    search === "trends" ? "Otras tendencias" : `${deviceName} similares`;

  const getTrending = () => {
    if (!fetching) {
      page.current += 1;
      getMoreTrendings(dispatch, source, selectedTimeframe, page.current);
    }
  };

  return (
    <div className="mt-20" id="other-trends">
      <SectionWrapper className="my-4">
        <p className="text-white opacity-90 pl-4 md:pl-0">{text}</p>
      </SectionWrapper>
      <div className="max-w-[565px] md:max-w-[1000px]">
        <Carousel
          content={sortedContent}
          getTrending={getTrending}
          search={search}
          source={source}
          url={url}
        />
      </div>
    </div>
  );
};

export default Similars;
