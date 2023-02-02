import { useContext } from "react";

import Image from "next/image";
import { Box, Text } from '@chakra-ui/react'

import { Props } from '.'

import { getContent } from '../../context/actions';
import { PageContext } from '../../context';

const ContentBox = ({ content, url, source }: Props) => {
  const { dispatch, state: { watchRegion } } = useContext(PageContext);

  const boxProps = {
    borderWidth: '1px',
    borderRadius: 'lg',
    overflow: 'hidden',
    borderColor: 'purple.500',
    width: '100%',
    display: 'flex',
    alignItems: "center",
    gap: "14px",
    padding: "8px",
    marginTop: "16px",
    cursor: "pointer",
  }

  if (!content) return null;

  const imageUrl = content.poster_path || content.backdrop_path;

  const handleLoadContent = async (id: any) => {
    await getContent(dispatch, source, id, watchRegion);
  }

  return (
    <Box {...boxProps} onClick={() => handleLoadContent(content.id)}>
      <Image
        src={`${url}${imageUrl}`}
        alt={content.title}
        width='40px'
        height='40px'
        placeholder='blur'
        blurDataURL={`${url}${content.poster_path}`}
      />
      <Text marginTop="-6px" fontSize="small">{content.name || content.title}</Text>
    </Box>
  )
}

export default ContentBox;
