import { useContext } from 'react';

import { Button, Box } from '@chakra-ui/react'
import Card from '../Card';
import Similars from '../Similars';

import { PageContext } from '../../context';

import { Props } from '../Layout';

const Mobile = ({ source, nextRecomendation, device, isFirst, contentId }: Props) => {
  const { state: { fetching, similars, BASE_IMAGE_URL } } = useContext(PageContext);

  return (
    <>
      <Card source={source} device={device} contentId={contentId} />
      <Box margin="10px 0" width="100%" display="flex" justifyContent="flex-end">
        <Button onClick={nextRecomendation} disabled={fetching} size="sm" colorScheme='purple' variant='ghost'>
          Ver siguiente recomendación
        </Button>
      </Box>
      {!fetching && similars ? <Similars isFirst={isFirst} url={BASE_IMAGE_URL} content={similars} source={source} /> : null}
    </>
  )
}

export default Mobile;