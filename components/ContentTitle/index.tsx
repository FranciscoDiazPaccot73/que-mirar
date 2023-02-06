import { useContext } from "react";
import { Text, Box, Select, Button } from '@chakra-ui/react'

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
  const { dispatch } = useContext(PageContext);
  
  const getTrending = () => {
    getInfo(dispatch, source);
    setFirst(true)
  }
  
  return (
    <Box display="flex" marginBottom="16px" justifyContent="space-between" alignItems="center">
      <Box display="flex" gap="12px">
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
          onClick={nextRecomendation}
        >
          {`${watchRegion === 'BR' ? 'Recomendações' : 'Recomendaciones'}`}
        </Button>
      </Box>
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
  )
}

export default ContentTitle;
