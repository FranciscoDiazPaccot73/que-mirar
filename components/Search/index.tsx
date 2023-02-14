import { useState, useEffect, useContext, useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Box,
  useDisclosure,
} from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";

import ContentBox from "../Similars/Box";

import { PageContext } from '../../context';
import { search, resetSearch } from '../../context/actions';

interface Props {
  source: string,
  region: string,
}

const SearchBox = ({ source, region }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const { state: { fetching, searchResult, BASE_IMAGE_URL }, dispatch } = useContext(PageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setInputValue('')
  }, [source, region])

  const handleSearch = async () => {
    if (inputValue && inputValue !== '') {
      await search(dispatch, source, inputValue, region)
    }
  }

  const handleModalClose = () => {
    onClose();
    resetSearch(dispatch);
  }

  const handleInputChange = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else {
      setInputValue(e.target?.value)
    }
  }

  return (
    <div>
      <Button
        size="sm"
        onClick={onOpen}
        leftIcon={<SearchIcon />}
        variant="outline"
      >
        Buscar
      </Button>
      <Modal initialFocusRef={inputRef} colorScheme="purple" isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center" gap="8px">
            <SearchIcon /> {`Buscar ${source === 'tv' ? 'serie' : 'pelicula'}`}
          </ModalHeader>
          <ModalCloseButton onClick={handleModalClose} />
          <ModalBody>
            <Box display="flex">
              <Input
                ref={inputRef}
                onChange={handleInputChange}
                colorScheme="pink"
                placeholder={`Nomrbe de la ${source === 'tv' ? 'serie' : 'pelicula'}`}
                size='sm'
              />
              <Button disabled={fetching} onClick={handleSearch} size="sm" colorScheme='purple' ml={3}>
                Buscar
              </Button>
            </Box>
            {searchResult?.length ? (
              <Box>
                {searchResult.map((result: any) => (
                  <Box key={result.id} onClick={handleModalClose}>
                    <ContentBox content={result} url={BASE_IMAGE_URL} source={source}  />
                  </Box>
                ))}
              </Box>
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SearchBox;
