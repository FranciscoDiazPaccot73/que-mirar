import { FC } from 'react';

type InputProps = {
  onChange: (e: any) => void;
  onKeyUp: (e: any) => void;
  placeholder: string;
};

const Input: FC<InputProps> = ({ onChange, placeholder, onKeyUp }) => (
  <input
    className="h-10 w-input-40 pl-4 pr-16 overflow-hidden rounded-md bg-main-bg text-white"
    id="search-input"
    placeholder={placeholder}
    onChange={onChange}
    onKeyUp={onKeyUp}
  />
);

export default Input;
