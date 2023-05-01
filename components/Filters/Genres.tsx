import { FC, useContext } from 'react';

import Carrousel from '../Carousel';
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

  return (
    <div>
      <p className="text-xs text-white opacity-90">Filtrar por género</p>
      {genres?.length ? (
        <Carrousel genres={genresWithAll} handleClick={handleGenre} selected={selectedGenre} source={source} />
      ) : (
        <div className="w-full flex mt-3 pl-4">
          <Skeleton type="genres" />
        </div>
      )}
    </div>
  );
};

export default Genres;
