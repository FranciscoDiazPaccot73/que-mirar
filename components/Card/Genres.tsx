import { FC } from 'react';

import { GenresTypes } from '@/pages/types';
import { formatGenresText } from '@/utils';

type GenresProps = {
  genres?: GenresTypes[];
};

const Genres: FC<GenresProps> = ({ genres }) => {
  if (!genres || !genres.length) return null;

  const classes =
    'p-1 rounded-md border border-gray-500 justify-center text-center h-7 inline-block whitespace-nowrap text-ellipsis min-w-[28px] overflow-hidden';

  if (genres.length <= 2) {
    return (
      <div className="flex gap-1 mt-1">
        {genres.map((genre: GenresTypes) => (
          <div key={genre.id} className={classes}>
            {genre.name}
          </div>
        ))}
      </div>
    );
  }

  const [g1, g2, ...rest] = genres;

  const genresText = formatGenresText(genres);

  return (
    <div className="flex gap-1 mt-1">
      <div className={classes}>{g1.name}</div>
      <div className={classes}>{g2.name}</div>
      <div className={classes} title={genresText}>
        +{rest.length}
      </div>
    </div>
  );
};

Genres.defaultProps = {
  genres: undefined,
};

export default Genres;
