import { FC, useContext } from 'react';

import { ContentInterface } from '@/pages/types';

import { PageContext } from '@/context';
import { getInfo, resetValues } from '@/context/actions';
import Button from '../Button';
import ContentBox from './Box';

type SimilarsProps = {
  url: string;
  content: ContentInterface[];
  source: string;
  search: string;
};

const Similars: FC<SimilarsProps> = ({ url, content, source, search }) => {
  const {
    dispatch,
    state: { fetching, selectedTimeframe = 'day' },
  } = useContext(PageContext);
  const deviceName = source === 'movie' ? 'Peliculas' : 'Series';
  const sortedContent = content.sort((a: ContentInterface, b: ContentInterface) => b.popularity - a.popularity);
  const text = search === 'trends' ? 'Otras tendencias' : `${deviceName} similares`;

  const getTrending = () => {
    if (!fetching) {
      window.scrollTo(0, 0);
      resetValues(dispatch);
      getInfo(dispatch, source, selectedTimeframe);
    }
  };

  return (
    <div className="mt-10">
      <p className="text-white opacity-90 my-4 pl-4 md:pl-0">{text}</p>
      <div className="grid gap-6 text-white grid-cols-2 px-1 md:gap-10 md:px-0 md:grid-cols-4">
        {sortedContent.map((data: ContentInterface) => (
          <ContentBox key={data.id} content={data} source={source} url={url} />
        ))}
      </div>
      <div className="mt-4 w-full flex justify-center">
        <Button color="purple" label="Ver mas" size="sm" variant="outline" onClick={getTrending} />
      </div>
    </div>
  );
};

export default Similars;
