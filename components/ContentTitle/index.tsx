import { FC, useContext, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import Button from '../Button';
import SearchBox from '../Search';
import FilterModal from '../FiltersModal';

import { PageContext } from '../../context';
import { getInfo, resetValues, setTimeframe } from '../../context/actions';

type ContentTitleProps = {
  watchRegion: string;
  source: string;
  search: string;
  onChangeRegion?: (newRegion: any) => void;
};

const ContentTitle: FC<ContentTitleProps> = ({ search, watchRegion, onChangeRegion = () => {}, source }) => {
  const {
    dispatch,
    state: { fetching, selectedTimeframe = 'day' },
  } = useContext(PageContext);
  const animationOffset = useRef('115px');
  const { pathname } = useRouter();

  const basePath = pathname?.includes('movies') ? '/movies' : '/';

  useEffect(() => {
    if (window.innerWidth < 768) animationOffset.current = '70px';
  }, []);

  const trendigsWording = watchRegion === 'BR' ? 'Tendências' : 'Tendencias';
  const recomendationsWording = watchRegion === 'BR' ? 'Recomendações' : 'Recomendaciones';

  const getTrending = (frame: string) => {
    if (!fetching) {
      resetValues(dispatch);
      getInfo(dispatch, source, frame);
    }
  };

  const handleTimeframe = (frame: string) => {
    if (!fetching && frame !== selectedTimeframe) {
      setTimeframe(dispatch, frame);
      getTrending(frame);
    }
  };

  const handleNewSource = () => {
    resetValues(dispatch);
  };

  return (
    <div className="flex text-white flex-col items-center justify-between mb-4">
      <div className="flex w-full gap-10 items-end">
        <p className="pl-4 text-2xl md:text-4xl">{search === 'trends' ? trendigsWording : recomendationsWording}</p>
        {search === 'trends' ? (
          <div className="flex rounded-full border border-purple relative">
            <div
              className="py-1 px-3 cursor-pointer flex items-center justify-center w-[70px] md:w-[115px]"
              onClick={() => handleTimeframe('day')}
            >
              <p
                className={`${
                  selectedTimeframe === 'day' ? 'text-black' : 'text-white'
                } transition-colors duration-300 text-sm md:text-base`}
              >
                Hoy
              </p>
            </div>
            <div
              className="py-1 px-3 cursor-pointer flex items-center justify-center w-[70px] md:w-[115px]"
              onClick={() => handleTimeframe('week')}
            >
              <p
                className={`${
                  selectedTimeframe === 'week' ? 'text-black' : 'text-white'
                } transition-colors duration-300 text-sm md:text-base`}
              >
                Semana
              </p>
            </div>
            <div
              className="h-full absolute rounded-full bg-purple -z-10 transition-left duration-300 w-[70px] md:w-[115px]"
              style={{ left: selectedTimeframe === 'day' ? '0' : animationOffset.current }}
            />
          </div>
        ) : null}
      </div>
      <div className="mt-8 w-full flex items-center">
        <Button
          href={search === 'trends' ? `${basePath}/recomendations` : basePath}
          label={`Ver ${search === 'trends' ? recomendationsWording : trendigsWording}`}
          size="lg"
          variant="transparent"
          onClick={handleNewSource}
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
