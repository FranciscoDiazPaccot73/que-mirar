import { useContext } from 'react';

import { Button, Box } from '@chakra-ui/react'
import Card from '../Card';

import { PageContext } from '../../context';

import { Props } from '../Layout';

const Mobile = ({ source, nextRecomendation, device }: Props) => {
  const { state: { fetching } } = useContext(PageContext);

  return (
    <>
      <Card source={source} device={device} />
      <Box margin="10px 0" width="100%" display="flex" justifyContent="flex-end">
        <Button onClick={nextRecomendation} disabled={fetching} size="sm" colorScheme='purple' variant='ghost'>
          Ver siguiente recomendación
        </Button>
      </Box>
    </>
  )
}

export default Mobile;