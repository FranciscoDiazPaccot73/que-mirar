import { useContext, FC } from 'react';

import SearchBox from '../Search';
import Button from '../Button';

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

//TODO types

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

  // TODO ICON

  return (
    <div className="flex text-white flex-col items-center justify-between mb-4">
      <div className="flex justify-between mb-4 w-full">
        <SearchBox region={watchRegion} source={source} />
        <div className="relative w-20">
          <p className="text-[10px] absolute -top-4">Región</p>
          <select
            className="w-full cursor-pointer bg-transparent text-white outline-2 outline-transparent outline relative appearance-none h-8 border border-white border-opacity-30 px-3 rounded-sm"
            value={watchRegion}
            onChange={onChange}
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
        <Button variant={`${isFirst ? 'solid' : 'outline'}`} label={`${watchRegion === 'BR' ? 'Tendências' : 'Tendencias'}`} onClick={getTrending} />
        <Button variant={`${isFirst ? 'outline' : 'solid'}`} label= {`${watchRegion === 'BR' ? 'Recomendações' : 'Recomendaciones'}`} onClick={handleGetRecomendation} />
      </div>
    </div>
  );
};

export default ContentTitle;
