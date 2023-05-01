import { FC, useContext } from 'react';

import Button from '../Button';
import SearchBox from '../Search';

import { PageContext } from '../../context';
import { getInfo, resetValues } from '../../context/actions';
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

const ContentTitle: FC<ContentTitleProps> = ({ isFirst, watchRegion, onChange = () => {}, source, nextRecomendation, setFirst }) => {
  const {
    dispatch,
    state: { fetching },
  } = useContext(PageContext);

  const getTrending = () => {
    if (!isFirst && !fetching) {
      resetValues(dispatch);
      getInfo(dispatch, source);
      setFirst(true);
    }
  };

  const handleGetRecomendation = () => {
    if (isFirst && !fetching && nextRecomendation) {
      nextRecomendation();
    }
  };

  const handleChangeRegion = (e: { target: { value: string } }) => {
    const { value } = e.target;

    onChange(value);
  };

  return (
    <div className="flex text-white flex-col items-center justify-between mb-4">
      <div className="flex justify-between mb-4 w-full">
        <SearchBox region={watchRegion} source={source} />
        <div className="relative w-20">
          <p className="text-[10px] absolute -top-4">Región</p>
          <select
            className="w-full cursor-pointer bg-transparent text-white outline-2 outline-transparent outline relative appearance-none h-8 border border-white border-opacity-30 px-3 rounded-sm after:url"
            value={watchRegion}
            onChange={handleChangeRegion}
          >
            {availableRegions.map((region: string) => (
              <option key={region} className="text-white bg-secondary" value={region}>
                {region}
              </option>
            ))}
          </select>
          <img alt="Down chevron" className="float-right -mt-6 mr-2" src="/chevron-down.svg" />
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
