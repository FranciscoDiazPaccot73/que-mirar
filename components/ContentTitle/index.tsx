import { FC, useContext, useState } from 'react';

import Button from '../Button';
import SearchBox from '../Search';
import FilterModal from '../FiltersModal';

import { PageContext } from '../../context';
import { getInfo, resetValues } from '../../context/actions';

type ContentTitleProps = {
  watchRegion: string;
  source: string;
  search: string;
  onChangeRegion?: (newRegion: any) => void;
};

const ContentTitle: FC<ContentTitleProps> = ({ search, watchRegion, onChangeRegion = () => {}, source }) => {
  const {
    dispatch,
    state: { fetching },
  } = useContext(PageContext);
  const [selectedTimeframe, setTimeframe] = useState('day');

  const trendigsWording = watchRegion === 'BR' ? 'Tendências' : 'Tendencias';
  const recomendationsWording = watchRegion === 'BR' ? 'Recomendações' : 'Recomendaciones';

  const getTrending = (frame: string) => {
    if (!fetching) {
      resetValues(dispatch);
      getInfo(dispatch, source, frame);
    }
  };

  const handleTimeframe = (frame: string) => {
    if (frame !== selectedTimeframe) {
      setTimeframe(frame);
      getTrending(frame);
    }
  };

  return (
    <div className="flex text-white flex-col items-center justify-between mb-4">
      <div className="flex w-full gap-10 items-end">
        <p className="md:text-4xl">{search === 'trends' ? trendigsWording : recomendationsWording}</p>
        {search === 'trends' ? (
          <div className="flex rounded-full border border-purple relative">
            <div className="py-1 px-3 cursor-pointer w-[115px] flex items-center justify-center" onClick={() => handleTimeframe('day')}>
              <p className={`${selectedTimeframe === 'day' ? 'text-black' : 'text-white'} transition-colors duration-300`}>Hoy</p>
            </div>
            <div className="py-1 px-3 cursor-pointer w-[115px] flex items-center justify-center" onClick={() => handleTimeframe('week')}>
              <p className={`${selectedTimeframe === 'week' ? 'text-black' : 'text-white'} transition-colors duration-300`}>Esta semana</p>
            </div>
            <div
              className="w-[115px] h-full absolute rounded-full bg-purple -z-10 transition-left duration-300"
              style={{ left: selectedTimeframe === 'day' ? '0' : '115px' }}
            />
          </div>
        ) : null}
      </div>
      <div className="mt-8 w-full flex items-center">
        <Button
          href={search === 'trends' ? '/recomendations' : '/'}
          label={`Ver ${search === 'trends' ? recomendationsWording : trendigsWording}`}
          size="lg"
          variant="transparent"
        />
        <div className="ml-auto flex gap-3">
          <SearchBox region={watchRegion} source={source} />
          <FilterModal onChangeRegion={onChangeRegion} />
        </div>
      </div>
    </div>
  );
};

ContentTitle.defaultProps = {
  onChangeRegion: () => {},
};

export default ContentTitle;
