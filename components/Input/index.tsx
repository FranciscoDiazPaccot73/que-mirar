import { FC } from "react"

type InputProps = {
  onChange: (e: any) => void
  onKeyUp: (e: any) => void
  placeholder: string
}

// TODO check types

const Input: FC<InputProps> = ({ onChange, placeholder, onKeyUp }) => (
  <input
    className="h-10 w-input-40 pl-4 pr-16 overflow-hidden rounded-md bg-main-bg text-white"
    id="search-input"
    onChange={onChange}
    placeholder={placeholder}
    onKeyUp={onKeyUp}
  />
)

export default Input;
