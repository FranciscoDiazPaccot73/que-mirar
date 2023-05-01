import { FC, ReactNode } from "react";
import classNames from "classnames";

type ButtonProps = {
  label: string
  onClick: () => void
  h?: string
  variant?: string
  icon?: ReactNode
  disabled?: boolean
  customClass?: string
  color?: string
  size?: string
}

const Button: FC<ButtonProps> = ({ variant = 'solid', onClick, label, icon, disabled, customClass = '', h = '7', color = 'purple', size = 'xs' }) => {
  const buttonClasses = classNames(
    "inline-flex appearance-none items-center gap-3 justify-center relative select-none outline-none outline-offset-2 rounded-md font-semibold px-4 py-2",
    `h-${h}`, `text-${size}`, customClass, {
    "text-black bg-purple md:hover:bg-purple-hover": variant === 'solid',
    "bg-transparent border": variant === 'outline',
    "text-purple md:hover:bg-purple-12": variant === 'transparent',
    "text-purple border-purple md:hover:bg-purple-12": variant === 'outline' && color === 'purple',
    "border-white border-opacity-30 md:hover:border-opacity-40": variant === 'outline' && color === 'gray',
  })

  const handleClick = () => {
    if (!disabled) onClick();
  }

  return <button disabled={disabled} className={buttonClasses} onClick={handleClick}>{icon}{label}</button>
}

export default Button;
