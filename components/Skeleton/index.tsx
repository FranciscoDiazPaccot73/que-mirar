/* eslint-disable react/no-array-index-key */
import { FC } from "react";

type SkeletonProps = {
  type: string;
};

const Skeleton: FC<SkeletonProps> = ({ type }) => {
  if (type === "card") {
    return (
      <div className="flex flex-col gap-2 w-full min-h-[650px] md:min-h-[550px] md:flex-row">
        <div className="bg-skeleton animate-pulse w-full h-[240px] md:hidden" />
        <div className="px-4 pt-2 pb-3 md:w-3/4 md:px-8 md:mt-2 md:mb-16">
          <div className="bg-skeleton h-8 rounded-md animate-pulse w-full" />
          <div className="bg-skeleton h-5 rounded-md animate-pulse w-full mt-2 mb-3" />
          <div className="bg-skeleton h-4 rounded-md animate-pulse w-full mb-2" />
          <div className="bg-skeleton h-4 rounded-md animate-pulse w-full mb-2" />
          <div className="bg-skeleton h-4 rounded-md animate-pulse w-1/3" />
        </div>
        <div className="hidden bg-skeleton animate-pulse w-2/3 h-[550px] rounded md:block" />
      </div>
    );
  }

  if (type === "providers") {
    return (
      <div className="pt-2 pb-3 flex">
        {Array(7)
          .fill("")
          .map((_, index) => (
            <div
              key={`filter-skeleton-${index}`}
              className="bg-skeleton h-9 w-9 rounded-md animate-pulse mr-3"
            />
          ))}
      </div>
    );
  }

  if (type === "genres") {
    return (
      <div className="text-white flex h-10 w-full items-center justify-between rounded-md border border-purple-12 bg-secondary px-3 py-2 text-sm ring-offset-purple">
        <div className="h-full w-full bg-skeleton rounded-md animate-pulse" />
      </div>
    );
  }

  if (type === "genres-card") {
    return (
      <div className="pt-2 pb-3 flex">
        {Array(2)
          .fill("")
          .map((_, index) => (
            <div
              key={`filter-skeleton-${index}`}
              className="bg-skeleton h-8 w-8 rounded-md animate-pulse mr-3"
            />
          ))}
      </div>
    );
  }

  if (type === "similars") {
    return (
      <div className="mt-32">
        <div className="bg-skeleton mx-auto h-[270px] w-[190px] rounded-md my-4 animate-pulse" />
      </div>
    );
  }

  if (type === "search") {
    return (
      <div className="bg-skeleton mx-auto h-[270px] w-[190px] rounded-md my-4 animate-pulse" />
    );
  }

  return null;
};

export default Skeleton;
