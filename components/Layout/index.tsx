import { FC, useContext } from 'react';

import { PageContext } from '@/context';
import { ArrowRight, LineChart } from 'lucide-react';
import Card from '../Card';
import Similars from '../Similars';
import Skeleton from '../Skeleton';
import { Button } from '../Button/Button';
import { Share } from '../Share';

type LayoutProps = {
  source: string;
  nextRecomendation?: () => void;
  search: string;
};

const Layout: FC<LayoutProps> = ({ source, nextRecomendation, search }) => {
  const {
    state: { fetching, similars, BASE_IMAGE_URL },
  } = useContext(PageContext);

  const buttonProps = {
    onClick: search === "recomendations" ? nextRecomendation : () => {},
    href: search === "recomendations" ? undefined : "#other-trends",
    className: "gap-2"
  }

  return (
    <>
      <Card nextRecomendation={nextRecomendation} search={search} source={source} />
      <div className="w-full gap-3 flex justify-end my-3 text-purple md:hidden">
        <Share />
        <Button {...buttonProps} variant="site-transparent">
          {search === "recomendations" ? "Ver siguiente recomendación" : "Ver otras tendencias"}
          {search === "recomendations" ? <ArrowRight className="w-5 h-5" /> : <LineChart className="w-5 h-5" />}
        </Button>
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
