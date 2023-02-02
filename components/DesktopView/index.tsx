import { useContext } from 'react';

import Card from '../Card';
import Similars from '../Similars';

import { PageContext } from '../../context';

interface Props {
  source: string,
  nextRecomendation(): void,
  device: string|null,
  isFirst: boolean,
};

const Desktop = ({ source, nextRecomendation, device, isFirst }: Props) => {
  const { state: { fetching, similars, BASE_IMAGE_URL } } = useContext(PageContext);

  return (
    <>
      <Card source={source} device={device} nextRecomendation={nextRecomendation} />
      {!isFirst && !fetching && similars ? <Similars url={BASE_IMAGE_URL} content={similars} source={source} /> : null}
    </>
  )
}

export default Desktop;