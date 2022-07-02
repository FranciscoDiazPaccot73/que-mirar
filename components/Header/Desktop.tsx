import Image from 'next/image';
import { Tabs, TabList, Tab, Box } from '@chakra-ui/react'
import Logo from '../../public/logo.webp';

import { Props } from './index'

const Desktop = ({ linkSelected, handleTab }: Props) => {

  return (
    <Box
      maxWidth="850px"
      width="100%"
      display="flex"
      margin="20px auto"
    >
      <Box margin="0 24px" width="60px" display="flex" alignItems="center" justifyContent="center">
        <Image src={Logo} priority height="150px" width="150px" />
      </Box>
      <Tabs defaultIndex={linkSelected} colorScheme="purple" size="lg" isFitted onChange={a => handleTab(a)}>
        <TabList>
          <Tab width="100px" isSelected={linkSelected === 0}>Peliculas</Tab>
          <Tab width="100px" isSelected={linkSelected === 1}>Series</Tab>
        </TabList>
      </Tabs>
      <div style={{ width: "100%", height: "53px", borderBottom: "2px solid #3f444e" }} />
    </Box>
  )
}

export default Desktop;
