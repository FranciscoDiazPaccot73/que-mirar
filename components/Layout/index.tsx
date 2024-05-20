import { FC, useContext } from 'react';

import { PageContext } from '@/context';
import { ArrowRight } from 'lucide-react';
import Button from '../Button';
import Card from '../Card';
import Similars from '../Similars';
import Skeleton from '../Skeleton';

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
    label: search === "recomendations" ? "Ver siguiente recomendación" : "Ver otras tendencias",
    size: "sm",
    variant: "transparent",
    onClick: search === "recomendations" ? nextRecomendation : () => {},
    href: search === "recomendations" ? undefined : "#other-trends",
    rightIcon: search === "recomendations" ? <ArrowRight className="w-5 h-5" /> : undefined,
    customClass: "gap-2",
    disabled: fetching,
  }

  return (
    <>
      <Card nextRecomendation={nextRecomendation} search={search} source={source} />
      <div className="w-full flex justify-end my-3 text-purple md:hidden">
        <Button {...buttonProps} />
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
