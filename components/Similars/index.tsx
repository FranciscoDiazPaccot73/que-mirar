import { FC, useState } from 'react';

import { ContentInterface } from '@/pages/types';

import Button from '../Button';
import ContentBox from './Box';

type SimilarsProps = {
  url: string;
  content: ContentInterface[];
  source?: string;
  isFirst?: boolean;
};

const Similars: FC<SimilarsProps> = ({ url, content, source, isFirst }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deviceName = source === 'movie' ? 'Peliculas' : 'Series';
  const [first, second, third, ...rest] = content.sort((a: ContentInterface, b: ContentInterface) => b.popularity - a.popularity);
  const text = isFirst ? 'Otras tendencias' : `${deviceName} similares`;

  const handleClick = () => setIsOpen((prevState) => !prevState);

  return (
    <div className="mt-5">
      <p className="text-white opacity-90 my-4">{text}</p>
      <div className="flex flex-col gap-4 text-white">
        <ContentBox content={first} source={source} url={url} />
        <ContentBox content={second} source={source} url={url} />
        <ContentBox content={third} source={source} url={url} />
        {isOpen ? (
          <>
            {rest.map((data: ContentInterface) => (
              <ContentBox key={data.id} content={data} source={source} url={url} />
            ))}
          </>
        ) : null}
        <div className="ml-auto">
          <Button color="gray" label={`${isOpen ? 'Ver menos' : 'Ver todo'}`} size="sm" variant="transparent" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

Similars.defaultProps = {
  source: '',
  isFirst: true,
};

export default Similars;
