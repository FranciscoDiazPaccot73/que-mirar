import { FC, useContext } from 'react';

import Button from '../Button';
import SearchBox from '../Search';

import { PageContext } from '../../context';
import { getInfo } from '../../context/actions';
import { availableRegions } from '../../utils';

type ContentTitleProps = {
  isFirst: boolean;
  watchRegion: string;
  source: string;
  setFirst: (value: boolean) => void;
  onChange?: (newRegion: any) => void;
  nextRecomendation?: () => void;
};

// TODO types

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
    if (isFirst && !fetching && nextRecomendation) {
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
        <Button
          label={`${watchRegion === 'BR' ? 'Tendências' : 'Tendencias'}`}
          variant={`${isFirst ? 'solid' : 'outline'}`}
          onClick={getTrending}
        />
        <Button
          label={`${watchRegion === 'BR' ? 'Recomendações' : 'Recomendaciones'}`}
          variant={`${isFirst ? 'outline' : 'solid'}`}
          onClick={handleGetRecomendation}
        />
      </div>
    </div>
  );
};

ContentTitle.defaultProps = {
  onChange: () => {},
  nextRecomendation: () => {},
};

export default ContentTitle;
