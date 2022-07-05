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
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          marginTop="12px"
        >
          <Skeleton height='35px' width="80px" marginRight="10px" />
          <Skeleton height='35px' width="80px" marginRight="10px" />
          <Skeleton height='35px' width="80px" marginRight="10px" />
          <Skeleton height='35px' width="80px" marginRight="10px" />
        </Box>
      )}
    </Box>
  )
}

export default Genres;

