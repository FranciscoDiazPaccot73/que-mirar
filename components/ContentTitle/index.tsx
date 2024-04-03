import { FC, useContext, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { FilterIcon } from 'lucide-react';
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
import { Switcher } from '../Switcher';

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
    <div className="flex text-white flex-col items-center justify-between md:mb-4">
      <div className="w-full px-3 md:px-0 md:flex md:gap-10 md:items-end">
        <div className='w-full flex justify-center mb-5 md:mb-0 md:block'>
          <Switcher isLeftActiveTab={search === 'trends'} left={trendigsWording} right={recomendationsWording} onClick={handleNewSource} />
        </div>
        <div className="flex gap-3 justify-end md:ml-auto md:mr-2">
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
                  <Switcher isLeftActiveTab={selectedTimeframe === 'day'} left='Hoy' right='Semana' onClick={() => handleTimeframe(selectedTimeframe === 'day' ? 'week' : 'day')} />
                ) : null}
              </div>
              <Filters selectedFilter={() => setSheetOpen(false)} source={source} onChangeRegion={onChangeRegion} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

ContentTitle.defaultProps = {
  onChangeRegion: () => {},
};

export default ContentTitle;
