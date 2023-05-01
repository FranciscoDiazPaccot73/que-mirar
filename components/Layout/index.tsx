import { FC, useContext } from 'react';

import { PageContext } from '@/context';
import Button from '../Button';
import Card from '../Card';
import Similars from '../Similars';

type LayoutProps = {
  source: string;
  nextRecomendation: () => void;
  isFirst: boolean;
};

const Layout: FC<LayoutProps> = ({ source, nextRecomendation, isFirst }) => {
  const {
    state: { fetching, similars, BASE_IMAGE_URL },
  } = useContext(PageContext);

  return (
    <>
      <Card nextRecomendation={nextRecomendation} source={source} />
      <div className="w-full flex justify-end my-3 text-purple md:hidden">
        <Button disabled={fetching} label="Ver siguiente recomendación" size="sm" variant="transparent" onClick={nextRecomendation} />
      </div>
      {!fetching && similars ? <Similars content={similars} isFirst={isFirst} source={source} url={BASE_IMAGE_URL} /> : null}
    </>
  );
};

export default Layout;
