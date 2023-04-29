import { FC, useContext } from "react";

import Button from "../Button";
import Card from "../Card";

import { PageContext } from "@/context";

type LayoutProps = {
  contentId?: string | null,
  source: string,
  nextRecomendation: ()=> void,
  isFirst: boolean,
}

const Layout: FC<LayoutProps> = ({ source, nextRecomendation, isFirst, contentId }) => {
  const { state: { fetching, similars, BASE_IMAGE_URL } } = useContext(PageContext);

  return (
    <>
      <Card source={source} contentId={contentId} />
      <div className="w-full flex justify-end my-3">
        <Button onClick={nextRecomendation} disabled={fetching}variant='transparent' label="Ver siguiente recomendación" />
      </div>
      {/*!fetching && similars ? <Similars isFirst={isFirst} url={BASE_IMAGE_URL} content={similars} source={source} /> : null*/}
    </>
  )
}

export default Layout;
