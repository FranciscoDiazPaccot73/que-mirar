import { useState } from 'react';

import Button from '../Button';
import ContentBox from './Box';

interface Props {
  url: string;
  content: any;
  source?: string;
  isFirst?: boolean;
}

const Similars = ({ url, content, source, isFirst }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deviceName = source === 'movie' ? 'Peliculas' : 'Series';
  const [first, second, third, ...rest] = content.sort((a: any, b: any) => b.popularity - a.popularity);
  const text = isFirst ? 'Otras tendencias' : `${deviceName} similares`;

  const handleClick = () => setIsOpen((prevState) => !prevState);

  return (
    <div className="mt-5">
      <div className="flex items-center justify-between my-4">
        <p className="text-white opacity-90">{text}</p>
        <Button color="gray" label={`${isOpen ? 'Ver menos' : 'Ver todo'}`} size="sm" variant="transparent" onClick={handleClick} />
      </div>
      <div className="flex flex-col gap-4 text-white">
        <ContentBox content={first} source={source} url={url} />
        <ContentBox content={second} source={source} url={url} />
        <ContentBox content={third} source={source} url={url} />
        {isOpen ? (
          <>
            {rest.map((data: any) => (
              <ContentBox key={data.id} content={data} source={source} url={url} />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

Similars.defaultProps = {
  source: '',
  isFirst: true,
};

export default Similars;
