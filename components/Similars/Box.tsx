import { useContext } from "react";

import Image from "next/image";

import { Props } from '.'

import { getContent, getSimilars } from '../../context/actions';
import { PageContext } from '../../context';

const ContentBox = ({ content, url, source }: Props) => {
  const { dispatch, state: { watchRegion } } = useContext(PageContext);
  
  if (!content) return null;

  const { id, name, title, poster_path: poster, vote_average: vote, backdrop_path: backdropPath, overview } = content;
  const boxClasses = 'h-full rounded rounded-md overflow-hidden border border-purple flex items-center gap-2 px-2 py-1 cursor-pointer'

  const imageUrl = poster || backdropPath;

  const handleLoadContent = async () => {
    // TODO: ABORD REQUEST

    if (id) {
      const newContentId = await getContent(dispatch, source, id, watchRegion);
      await getSimilars(dispatch, source, newContentId, watchRegion);
    }
  }

  return (
    <div title={overview ?? title} className={boxClasses} onClick={handleLoadContent}>
      <Image
        src={`${url}${imageUrl}`}
        alt={title}
        width={40}
        height={60}
        placeholder='blur'
        blurDataURL={`${url}${poster}`}
      />
      <p className="text-sm">{name || title}</p>
      {vote ? <p className="text-xs text-slate-400 ml-auto flex">{vote.toFixed(2)}<span className="hidden md:block">/10</span></p> : null}
    </div>
  )
}

export default ContentBox;
