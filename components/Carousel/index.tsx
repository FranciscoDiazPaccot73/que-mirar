import classnames from 'classnames';
import { FC, KeyboardEvent, useEffect, useRef } from 'react';

import { GenresTypes } from '@/pages/types';
import { excludedGenres } from '@/utils';

type CarouselProps = {
  genres: GenresTypes[];
  selected: number;
  handleClick: Function;
  source: string;
};

const Carrousel: FC<CarouselProps> = ({ genres, selected, handleClick, source }) => {
  const sliderRef = useRef(null);
  let isDown = false;
  let startX: any;
  let scrollLeft: any;
  const scrollSize = 100;

  useEffect(() => {
    const slider: any = sliderRef.current;
    const genresIds = genres.map((g: GenresTypes) => g.id);
    const selectedPosition = genresIds.indexOf(selected);

    if (slider) {
      slider.scrollLeft = scrollSize * selectedPosition;
      slider.addEventListener('mousedown', (e: any) => {
        isDown = true;
        slider.classList.add('carrousel_active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('carrousel_active');
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('carrousel_active');
      });
      slider.addEventListener('mousemove', (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; // scroll-fast

        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>, id: number | string) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleClick(id);
    }
  };

  return (
    <div
      ref={sliderRef}
      className="cursor-pointer overflow-y-hidden overflow-x-scroll relative scale-95 transition-all whitespace-nowrap w-full will-change-transform select-none scrollbar"
    >
      {genres.map((genre: GenresTypes, index: number) => {
        if (source === 'tv' && excludedGenres.includes(genre.id.toString())) return null;

        const categoryClasses = classnames(
          'rounded-md border border-purple-50 inline-block my-3 mx-2 min-h-[24px] min-w-[60px] first-of-type:ml-1 last-of-type:mr-1 md:hover:bg-purple',
          `category-${index + 1}`,
          {
            'bg-purple text-filter-color text-semibold': genre.id === selected,
          },
        );
        const textClasses = classnames(
          'text-center text-xs py-1 px-2',
          genre.id === selected ? 'text-black' : 'text-white md:hover:text-filter-color',
        );

        return (
          <div
            key={`genre-${genre.id}`}
            className={categoryClasses}
            onClick={() => handleClick(genre.id)}
            onKeyUp={(e) => handleKeyUp(e, genre.id)}
          >
            <p className={textClasses}>{genre?.name.toUpperCase()}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Carrousel;
