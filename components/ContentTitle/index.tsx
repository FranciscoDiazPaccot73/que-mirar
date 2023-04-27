import { useContext, FC } from 'react';

// import Searchdiv from '../Search';

import { PageContext } from '../../context';
import { getInfo } from '../../context/actions';
import { availableRegions } from '../../utils';

type ContentTitleProps = {
  isFirst: boolean;
  watchRegion: string;
  onChange?: any;
  source: string;
  nextRecomendation?: any;
  setFirst: any;
};

const ContentTitle: FC<ContentTitleProps> = ({ isFirst, watchRegion, onChange, source, nextRecomendation, setFirst }) => {
  const {
    dispatch,
    state: { fetching },
  } = useContext(PageContext);

  const getTrending = () => {
    if (!isFirst && !fetching) {
      getInfo(dispatch, source);
      setFirst(true);
    }
  };

  const handleGetRecomendation = () => {
    if (isFirst && !fetching) {
      nextRecomendation();
    }
  };

  return (
    <div className="flex text-white flex-col items-center justify-between mb-4">
      <div className="flex justify-between mb-4 w-full">
        {/* <SearchBox region={watchRegion} source={source} /> */}
        <div className="relative w-20">
          <p className="text-[10px] absolute -top-4">Región</p>
          <select
            className="w-full bg-transparent text-white outline-2 outline-transparent outline relative appearance-none h-8 border border-white border-opacity-30 px-3 rounded-sm"
            value={watchRegion}
          >
            {availableRegions.map((region: string) => (
              <option key={region} className="text-white bg-secondary" value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex w-full gap-3">
        <button onClick={getTrending}>{`${watchRegion === 'BR' ? 'Tendências' : 'Tendencias'}`}</button>
        <button onClick={handleGetRecomendation}>{`${watchRegion === 'BR' ? 'Recomendações' : 'Recomendaciones'}`}</button>
      </div>
    </div>
  );
};

export default ContentTitle;
