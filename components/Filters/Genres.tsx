import { useContext } from 'react';

import { Box, Text, Skeleton } from "@chakra-ui/react";
import Carrousel from "../Carousel";

import { PageContext } from '../../context';

interface Props {
  handleGenre: any,
}

const Genres = ({ handleGenre }: Props) => {
  const { state: { genres = [], selectedGenre } } = useContext(PageContext);

  return (
    <Box>
      <Text fontSize="12px">Filtrar por género</Text>
      {genres?.length ? (
        <Carrousel genres={genres} selected={selectedGenre} handleClick={handleGenre} />
      ) : (
        <>
          <Skeleton height='35px' width="35px" marginRight="10px" />
          <Skeleton height='35px' width="35px" marginRight="10px" />
          <Skeleton height='35px' width="35px" marginRight="10px" />
          <Skeleton height='35px' width="35px" marginRight="10px" />
        </>
      )}
    </Box>
  )
}

export default Genres;

