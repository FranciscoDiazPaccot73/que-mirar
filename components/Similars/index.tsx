import { Box, Text } from '@chakra-ui/react'

import ContentBox from './Box';

export interface Props {
  url: string,
  content: any,
  source?: string,
}

const Similars = ({ url, content, source }: Props) => {
  const deviceName = source === 'movie' ? "Peliculas" : "Series";
  const [first, second, third, ...rest] = content.sort(() => Math.random() - 0.5);

  return (
    <Box marginTop="20px">
      <Text>{`${deviceName} similares`}</Text>
      <Box>
        <ContentBox content={first} url={url} source={source}  />
        <ContentBox content={second} url={url} source={source} />
        <ContentBox content={third} url={url} source={source} />
      </Box>
    </Box>
  )
}

export default Similars;
