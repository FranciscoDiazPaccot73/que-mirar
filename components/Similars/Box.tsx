import { useContext } from 'react';

import Image from 'next/image';

import { PageContext } from '../../context';
import { getContent, getSimilars, setSimilarToContent } from '../../context/actions';

interface Props {
  url: string;
  content: any;
  source?: string;
}

const ContentBox = ({ content, url, source }: Props) => {
  const {
    dispatch,
    state: { watchRegion },
  } = useContext(PageContext);

  if (!content) return null;

  const { id, name, title, poster_path: poster, vote_average: vote, backdrop_path: backdropPath, overview } = content;
  const boxClasses = 'h-full rounded rounded-md overflow-hidden border border-purple flex items-center gap-2 px-2 py-1 cursor-pointer';

  const imageUrl = poster || backdropPath;

  const handleLoadContent = async () => {
    if (id) {
      window.scrollTo(0, 0);
      setSimilarToContent(dispatch, content);
      await getContent(dispatch, source, id, watchRegion);
      await getSimilars(dispatch, source, id, watchRegion);
    }
  };

  return (
    <div className={boxClasses} title={overview ?? title} onClick={handleLoadContent}>
      <Image alt={title} blurDataURL={`${url}${poster}`} height={60} placeholder="blur" src={`${url}${imageUrl}`} width={40} />
      <p className="text-sm">{name || title}</p>
      {vote ? (
        <p className="text-xs text-slate-400 ml-auto flex">
          {vote.toFixed(2)}
          <span className="hidden md:block">/10</span>
        </p>
      ) : null}
    </div>
  );
};

ContentBox.defaultProps = {
  source: '',
};

export default ContentBox;
