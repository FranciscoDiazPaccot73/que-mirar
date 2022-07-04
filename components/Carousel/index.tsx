import React, { useEffect } from 'react';
import classnames from 'classnames';

import { Box, Text } from '@chakra-ui/react';

import styles from './styles.module.scss';

type Genre = {
  id: number|string,
  name: string,
}

interface Props {
  genres: Array<Genre>,
  selected: number|string,
  handleClick: Function,
}

const Carrousel = ({ genres, selected, handleClick }: Props) => {
  let isDown = false;
  let startX: any;
  let scrollLeft: any;
  const scrollSize = 100;

  const {
    carrousel_container,
    carrousel,
    carrousel_active,
    category,
    category_selected,
  } = styles;
  
  useEffect(() => {
    const slider: any = document.getElementById('carrousel');
    const genresIds = genres.map((g: Genre) => g.id);
    const selectedPosition = genresIds.indexOf(selected);

    if (slider) {
      slider.scrollLeft = scrollSize * selectedPosition;
      slider.addEventListener('mousedown', (e: any) => {
        isDown = true;
        slider.classList.add(carrousel_active);
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      });
      slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove(carrousel_active);
      });
      slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove(carrousel_active);
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
    <Box className={carrousel_container}>
      <Box className={carrousel} id="carrousel">
        {genres.map((genre: Genre, index: number) => {
          const categoryClasses = classnames(category, `category-${index + 1}`,
            genre.id === selected && category_selected,
          );

          return (
            <Box onClick={() => handleClick(genre.id)} key={`genre-${genre.id}`} className={categoryClasses}>
              <Text textAlign="center" fontSize="12px">{genre?.name.toUpperCase()}</Text>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Carrousel;
