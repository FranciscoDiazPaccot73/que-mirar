import { useContext } from 'react';

import { Box, Text } from "@chakra-ui/react";
import Carrousel from "../Carousel";
import SkeletonFilter from './Skeleton';

import { PageContext } from '../../context';

interface Props {
  handleGenre: any,
}

const Genres = ({ handleGenre }: Props) => {
  const { state: { genres = [], selectedGenre = 0 } } = useContext(PageContext);
  const genresWithAll = genres.length ? [...new Set([{ id: 0, name: "TODOS" }, ...genres])] : []

  return (
    <Box>
      <Text fontSize="12px">Filtrar por género</Text>
      {genres?.length ? (
        <Carrousel genres={genresWithAll} selected={selectedGenre} handleClick={handleGenre} />
      ) : (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          marginTop="12px"
        >
          <SkeletonFilter amount={4} />
        </Box>
      )}
    </Box>
  )
}

export default Genres;

