/* eslint-disable react/no-array-index-key */
import { FC } from 'react';

type SkeletonProps = {
  type: string;
};

const Skeleton: FC<SkeletonProps> = ({ type }) => {
  if (type === 'card') {
    return (
      <div className="flex flex-col gap-2 w-full md:flex-row">
        <div className="bg-skeleton animate-pulse w-full h-36 md:hidden" />
        <div className="px-4 pt-2 pb-3 md:w-3/4 md:px-8 md:mt-8 md:mb-16">
          <div className="bg-skeleton h-8 rounded-md animate-pulse w-full" />
          <div className="bg-skeleton h-5 rounded-md animate-pulse w-full mt-2 mb-3" />
          <div className="bg-skeleton h-4 rounded-md animate-pulse w-full mb-2" />
          <div className="bg-skeleton h-4 rounded-md animate-pulse w-full mb-2" />
          <div className="bg-skeleton h-4 rounded-md animate-pulse w-1/3" />
        </div>
      </div>
    );
  }

  if (type === 'providers') {
    return (
      <div className="pt-2 pb-3 flex">
        {Array(7)
          .fill('')
          .map((_, index) => (
            <div key={`filter-skeleton-${index}`} className="bg-skeleton h-9 w-9 rounded-md animate-pulse mr-3" />
          ))}
      </div>
    );
  }

  if (type === 'genres') {
    return (
      <div className="pt-2 pb-3 flex">
        {Array(3)
          .fill('')
          .map((_, index) => (
            <div key={`filter-skeleton-${index}`} className="bg-skeleton h-6 w-20 rounded-md animate-pulse mr-3" />
          ))}
      </div>
    );
  }

  if (type === 'genres-card') {
    return (
      <div className="pt-2 pb-3 flex">
        {Array(2)
          .fill('')
          .map((_, index) => (
            <div key={`filter-skeleton-${index}`} className="bg-skeleton h-8 w-8 rounded-md animate-pulse mr-3" />
          ))}
      </div>
    );
  }

  if (type === 'similars') {
    return (
      <div className="mt-5">
        <div className="bg-skeleton h-6 w-28 rounded-md my-4 animate-pulse ml-2 md:ml-0" />
        <div className="grid gap-6 grid-cols-2 px-1 md:gap-10 md:px-0 md:grid-cols-4">
          {Array(4)
            .fill('')
            .map((_, index) => (
              <div className="flex flex-col gap-2 items-center">
                <div key={`filter-skeleton-${index}`} className="bg-skeleton h-[100px] w-full rounded-md animate-pulse" />
                <div className="h-6 w-24 bg-skeleton rounded-md animate-pulse" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Skeleton;
