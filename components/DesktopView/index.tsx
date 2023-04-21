import { useContext } from 'react';

import Card from '../Card';
import Similars from '../Similars';

import { PageContext } from '../../context';

interface Props {
  source: string,
  nextRecomendation(): void,
  device?: string,
  isFirst: boolean,
  contentId?: string | null,
};

const Desktop = ({ source, nextRecomendation, device, isFirst, contentId }: Props) => {
  const { state: { fetching, similars, BASE_IMAGE_URL } } = useContext(PageContext);

  return (
    <>
      <Card contentId={contentId} source={source} device={device} nextRecomendation={nextRecomendation} />
      {!fetching && similars ? <Similars isFirst={isFirst} url={BASE_IMAGE_URL} content={similars} source={source} /> : null}
    </>
  )
}

export default Desktop;