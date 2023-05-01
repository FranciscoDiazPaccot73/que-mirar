import { useState } from 'react';

import ContentBox from './Box';
import Button from '../Button';

export interface Props {
  url: string,
  content: any,
  source?: string,
  isFirst?: boolean,
}

const Similars = ({ url, content, source, isFirst }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const deviceName = source === 'movie' ? "Peliculas" : "Series";
  const [first, second, third, ...rest] = content.sort((a: any, b: any) => b.popularity - a.popularity);
  const text = isFirst ? 'Otras tendencias' : `${deviceName} similares`;

  const handleClick = () => setIsOpen(prevState => !prevState);

  return (
    <div className='mt-5'>
      <div className='flex items-center justify-between my-4'>
        <p className='text-white opacity-90'>{text}</p>
        <Button size="sm" color='gray' variant='transparent' onClick={handleClick} label={`${isOpen ? 'Ver menos' : 'Ver todo'}`} />
      </div>
      <div className='flex flex-col gap-4 text-white'>
        <ContentBox content={first} url={url} source={source}  />
        <ContentBox content={second} url={url} source={source} />
        <ContentBox content={third} url={url} source={source} />
        {isOpen ? <>{rest.map((data: any) => <ContentBox key={data.id} content={data} url={url} source={source} />)}</> : null}
      </div>
    </div>
  )
}

export default Similars;
