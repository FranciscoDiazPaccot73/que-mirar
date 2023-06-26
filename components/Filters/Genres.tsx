import { FC, useContext, KeyboardEvent } from 'react';

import { GenresTypes } from '@/pages/types';
import { excludedGenres } from '@/utils';
import classnames from 'classnames';
import Skeleton from '../Skeleton';

import { PageContext } from '../../context';

type GenreProps = {
  handleGenre: (id: number) => void;
  source: string;
};

const Genres: FC<GenreProps> = ({ handleGenre, source }) => {
  const {
    state: { genres = [], selectedGenre = 0 },
  } = useContext(PageContext);
  const genresWithAll = genres.length ? [{ id: 0, name: 'TODOS' }, ...genres] : [];

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>, id: number) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleGenre(id);
    }
  };

  return (
    <div>
      <p className="text-xs text-white opacity-90">Género</p>
      {genres?.length ? (
        <div>
          {genresWithAll.map((genre: GenresTypes, index: number) => {
            if (source === 'tv' && excludedGenres.includes(genre.id.toString())) return null;

            const categoryClasses = classnames(
              'rounded-md border cursor-pointer border-purple inline-block my-3 mx-2 min-h-[24px] min-w-[60px] first-of-type:ml-1 last-of-type:mr-1 md:hover:bg-purple',
              `category-${index + 1}`,
              {
                'bg-purple text-filter-color text-semibold': genre.id === selectedGenre,
              },
            );
            const textClasses = classnames(
              'text-center text-xs py-1 px-2',
              genre.id === selectedGenre ? 'text-black' : 'text-white md:hover:text-filter-color',
            );

            return (
              <div
                key={`genre-${genre.id}`}
                className={categoryClasses}
                onClick={() => handleGenre(genre.id)}
                onKeyUp={(e) => handleKeyUp(e, genre.id)}
              >
                <p className={textClasses}>{genre?.name.toUpperCase()}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full flex mt-3 pl-4">
          <Skeleton type="genres" />
        </div>
      )}
    </div>
  );
};

export default Genres;
