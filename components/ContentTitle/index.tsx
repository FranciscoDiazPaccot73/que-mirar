import { useContext } from "react";
import { Text, Box, Select, Button } from '@chakra-ui/react'

import SearchBox from '../Search';

import { PageContext } from '../../context';
import { getInfo } from '../../context/actions'
import { availableRegions } from '../../utils'

interface Props {
  isFirst: boolean,
  watchRegion: string,
  onChange: any,
  source: string,
  nextRecomendation: any,
  setFirst: any,
}

const ContentTitle = ({ isFirst, watchRegion, onChange, source, nextRecomendation, setFirst }: Props) => {
  const { dispatch, state: { fetching } } = useContext(PageContext);
  
  const getTrending = () => {
    if (!isFirst && !fetching) {
      getInfo(dispatch, source);
      setFirst(true)
    }
  }

  const handleGetRecomendation = () => {
    if (isFirst && !fetching) {
      nextRecomendation()
    }
  }
  
  return (
    <Box display="flex" flexDirection="column" marginBottom="16px" justifyContent="space-between" alignItems="center">
      <Box marginBottom='16px' width="100%" display="flex" justifyContent="space-between">
        <SearchBox source={source} region={watchRegion} />
        <Box width="75px" position="relative">
          <Text position="absolute" top="-16px" fontSize="10px">Región</Text>
          <Select
            onChange={(e) => onChange(e.target.value)}
            value={watchRegion}
            size="sm"
            colorScheme="purple.500"
          >
            {availableRegions.map((region: string) => <option key={region} value={region}>{region}</option>)}
          </Select>
        </Box>
      </Box>
      <Box display="flex" gap="12px" width="100%">
        <Button
          variant={`${isFirst ? 'solid' : 'outline'}`}
          colorScheme='purple'
          size='xs'
          onClick={getTrending}
        >
          {`${watchRegion === 'BR' ? 'Tendências' : 'Tendencias'}`}
        </Button>
        <Button
          variant={`${isFirst ? 'outline' : 'solid'}`}
          colorScheme='purple'
          size='xs'
          onClick={handleGetRecomendation}
        >
          {`${watchRegion === 'BR' ? 'Recomendações' : 'Recomendaciones'}`}
        </Button>
      </Box>
    </Box>
  )
}

export default ContentTitle;
