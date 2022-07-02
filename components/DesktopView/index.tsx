import { useContext } from 'react';

import { Button, Box } from '@chakra-ui/react'
import Card from '../Card';

import { PageContext } from '../../context';

interface Props {
  source: string,
  nextRecomendation: any,
  device: string|null,
};

const Desktop = ({ source, nextRecomendation, device }: Props) => {
  const { state: { fetching } } = useContext(PageContext);

  return (
    <>
      <Card source={source} device={device} />
      <Box margin="10px 0" width="100%" display="flex" justifyContent="flex-end">
        <Button onClick={nextRecomendation} disabled={fetching} size="sm" colorScheme='purple' variant='ghost'>Siguiente recomendación</Button>
      </Box>
    </>
  )
}

export default Desktop;