import Image from 'next/image';
import { Tabs, TabList, Tab, Box } from '@chakra-ui/react'
import Logo from '../../public/logo.webp';

import { Props } from './index'

const Mobile = ({ linkSelected, handleTab }: Props) => {

  return (
    <>
      <Box margin="14px 0 0" width="100%" display="flex" alignItems="center" justifyContent="center">
        <Image src={Logo} priority height="125px" width="125px" />
      </Box>
      <Tabs defaultIndex={linkSelected} colorScheme="purple" size="lg" isFitted onChange={a => handleTab(a)}>
        <TabList>
          <Tab isSelected={linkSelected === 0}>Peliculas</Tab>
          <Tab isSelected={linkSelected === 1}>Series</Tab>
        </TabList>
      </Tabs>
    </>
  )
}

export default Mobile;
