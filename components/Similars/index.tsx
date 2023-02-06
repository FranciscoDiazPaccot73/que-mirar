import { Box, Text, Button, useDisclosure } from '@chakra-ui/react'

import ContentBox from './Box';

export interface Props {
  url: string,
  content: any,
  source?: string,
  isFirst?: boolean,
}

const Similars = ({ url, content, source, isFirst }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const deviceName = source === 'movie' ? "Peliculas" : "Series";
  const [first, second, third, ...rest] = content.sort((a: any, b: any) => b.popularity - a.popularity);
  const text = isFirst ? 'Otras tendencias' : `${deviceName} similares`;

  const handleClick = () => isOpen ? onClose() : onOpen();

  return (
    <Box marginTop="20px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text>{text}</Text>
        <Button fontSize="xs" variant='ghost' size="sm" onClick={handleClick}>{`${isOpen ? 'Ver menos' : 'Ver todo'}`}</Button>
      </Box>
      <Box>
        <ContentBox content={first} url={url} source={source}  />
        <ContentBox content={second} url={url} source={source} />
        <ContentBox content={third} url={url} source={source} />
        {isOpen ? <>{rest.map((data: any) => <ContentBox key={data.id} content={data} url={url} source={source} />)}</> : null}
      </Box>
    </Box>
  )
}

export default Similars;
