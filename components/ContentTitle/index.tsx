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
    <Box width="75px">
      <Text fontSize="10px">Región</Text>
      <Select
        onChange={(e) => onChange(e.target.value)}
        value={watchRegion}
      >
        {availableRegions.map((region: string) => <option value={region}>{region}</option>)}
      </Select>
    </Box>
  </Box>
)

export default ContentTitle;
