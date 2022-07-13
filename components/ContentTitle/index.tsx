import { Text, Box, Select } from '@chakra-ui/react'

import { availableRegions } from '../../utils'

interface Props {
  isFirst: boolean,
  watchRegion: string,
  onChange: any,
}

const ContentTitle = ({ isFirst, watchRegion, onChange }: Props) => (
  <Box display="flex" marginBottom="16px" justifyContent="space-between" alignItems="center">
    <Text fontSize="xl">{`${isFirst ? 'Tendencia de la semana' : 'Otras recomendaciones'}`}</Text>
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

export default ContentTitle;
