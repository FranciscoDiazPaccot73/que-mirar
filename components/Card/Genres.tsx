import { formatGenresText } from '@/utils';

// TODO TYPees

const Genres = ({ genres }: any) => {
  if (!genres || !genres.length) return null;

  if (genres.length <= 2) {
    return (
      <div className="flex gap-1 mt-1">
        {genres.map((genre: any) => (
          <div className="p-1 rounded-md border border-gray-500">{genre.name}</div>
        ))}
      </div>
    );
  }

  const [g1, g2, ...rest] = genres;

  const genresText = formatGenresText(genres);

  return (
    <div className="flex gap-1 mt-1">
      <div className="p-1 rounded-md border border-gray-500 flex items-center justify-center text-center">{g1.name}</div>
      <div className="p-1 rounded-md border border-gray-500 flex items-center justify-center text-center">{g2.name}</div>
      <div className="p-1 rounded-md border border-gray-500 flex items-center justify-center text-center" title={genresText}>
        +{rest.length}
      </div>
    </div>
  );
};

export default Genres;
