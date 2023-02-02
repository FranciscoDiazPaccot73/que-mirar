import { useState, useEffect } from "react";

import { search } from '../../context/actions';

interface Props {
  source: string,
  region: string,
}

const SearchBox = ({ source, region }: Props) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue('')
  }, [source, region])

  const handleSearch = async () => {
    if (inputValue && inputValue !== '') {
      await search(null, source, inputValue, region)
    }
  }

  return (
    <div>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default SearchBox;
