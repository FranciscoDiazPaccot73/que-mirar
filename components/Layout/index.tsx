import { FC, useContext } from 'react';

import { PageContext } from '@/context';
import Button from '../Button';
import Card from '../Card';
import Similars from '../Similars';
import Skeleton from '../Skeleton';

type LayoutProps = {
  source: string;
  nextRecomendation: () => void;
  search: string;
};

const Layout: FC<LayoutProps> = ({ source, nextRecomendation, search }) => {
  const {
    state: { fetching, similars, BASE_IMAGE_URL },
  } = useContext(PageContext);

  return (
    <>
      <Card nextRecomendation={nextRecomendation} search={search} source={source} />
      <div className="w-full flex justify-end my-3 text-purple md:hidden">
        <Button disabled={fetching} label="Ver siguiente recomendación" size="sm" variant="transparent" onClick={nextRecomendation} />
      </div>
      {similars?.length && !fetching ? (
        <Similars content={similars} search={search} source={source} url={BASE_IMAGE_URL} />
      ) : (
        <Skeleton type="similars" />
      )}
    </>
  );
};

export default Layout;
