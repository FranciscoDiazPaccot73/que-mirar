import { FC } from 'react';

import { GenresTypes } from '@/pages/types';

type GenresProps = {
  genres?: GenresTypes[];
};

const Genres: FC<GenresProps> = ({ genres }) => {
  if (!genres || !genres.length) return null;

  if (genres.length <= 2) {
    const genreTwo = genres[1] ? <> &bull; {genres[1].name}</> : <></>

    return (
      <p>{genres[0].name}{genreTwo}</p>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [g1, g2, ..._rest] = genres;

  return (
    <p>{g1.name} &bull; {g2.name}</p>
  );
};

Genres.defaultProps = {
  genres: undefined,
};

export default Genres;
