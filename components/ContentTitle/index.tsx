import { FC, useContext, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { ArrowRight, FilterIcon } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import SearchBox from '../Search';

import { PageContext } from '../../context';
import { getInfo, resetValues, setTimeframe } from '../../context/actions';
import Filters from '../Filters';

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
  const [sheetOpen, setSheetOpen] = useState(false);
  const animationOffset = useRef('115px');
  const { pathname } = useRouter();

  const basePath = pathname?.includes('movies') ? '/movies/' : '/';

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
    window.location.assign(search === 'trends' ? `${basePath}recomendations` : basePath)
  };

  return (
    <div className="flex text-white flex-col items-center justify-between mb-4">
      <div className="flex w-full gap-10 items-end">
        <h1 className="pl-4 text-2xl md:text-4xl">{search === 'trends' ? trendigsWording : recomendationsWording}</h1>
        <div className="ml-auto mr-2 flex gap-3">
          <SearchBox region={watchRegion} source={source} />
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                className="p-2 hover:bg-purple-12"
                size="sm"
                variant="ghost"
              >
                <FilterIcon className="h-4 w-4 text-purple" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className='text-white font-semibold'>Filtros</SheetTitle>
                <SheetDescription className='text-gray-400'>
                  Aplica nuestros filtros para obtener una busqueda mas exacta.
                </SheetDescription>
              </SheetHeader>
              <div className='flex w-full gap-10 items-center justify-center mt-8'>
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
              <Filters selectedFilter={() => setSheetOpen(false)} source={source} onChangeRegion={onChangeRegion} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="mt-2 w-full flex items-center">
        <Button
          className='group text-xl text-purple flex gap-1 items-center'
          variant="link"
          onClick={handleNewSource}
        >
          {`Ir a ${search === 'trends' ? recomendationsWording : trendigsWording}`}
          <ArrowRight className="duration-100 group-hover:ml-1 h-5 w-5 text-purple" />
        </Button>
      </div>
    </div>
  );
};

ContentTitle.defaultProps = {
  onChangeRegion: () => {},
};

export default ContentTitle;
