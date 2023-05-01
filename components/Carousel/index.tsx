import { useEffect, useRef } from 'react';
import classnames from 'classnames';

import { excludedGenres } from '../../utils';

type Genre = {
  id: number|string,
  name: string,
}

interface Props {
  genres: Array<Genre>,
  selected: number|string,
  handleClick: Function,
  source: string,
}

// TODO types

const Carrousel = ({ genres, selected, handleClick, source }: Props) => {
  const sliderRef = useRef(null)
  let isDown = false;
  let startX: any;
  let scrollLeft: any;
  const scrollSize = 100;
  
  useEffect(() => {
    const slider: any = sliderRef.current;
    const genresIds = genres.map((g: Genre) => g.id);
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
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

  return (
    <div
      className="cursor-pointer overflow-y-hidden overflow-x-scroll relative scale-95 transition-all whitespace-nowrap w-full will-change-transform select-none scrollbar"
      ref={sliderRef}
    >
      {genres.map((genre: Genre, index: number) => {
        if (source === 'tv' && excludedGenres.includes(genre.id.toString())) return null;

        const categoryClasses = classnames(
          "rounded-md border border-purple inline-block my-3 mx-2 min-h-[24px] min-w-[60px] first-of-type:ml-1 last-of-type:mr-1 md:hover:bg-purple",
          `category-${index + 1}`, {
          "bg-purple text-filter-color text-semibold": genre.id === selected
        });
        const textClasses = classnames('text-center text-xs py-1 px-2', genre.id === selected ? 'text-black' : 'text-white md:hover:text-filter-color')

        return (
          <div onClick={() => handleClick(genre.id)} key={`genre-${genre.id}`} className={categoryClasses}>
            <p className={textClasses}>{genre?.name.toUpperCase()}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Carrousel;
