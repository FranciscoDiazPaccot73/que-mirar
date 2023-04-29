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
}

const Button: FC<ButtonProps> = ({ variant = 'solid', onClick, label, icon, disabled, customClass = '', h = '7' }) => {
  const buttonClasses = classNames("inline-flex appearance-none items-center gap-3 justify-center relative select-none outline-none outline-offset-2 rounded-md font-semibold text-xs px-4 py-2", `h-${h}`, customClass, {
    "text-black bg-purple md:hover:bg-purple-hover": variant === 'solid',
    "text-purple bg-transparent border border-purple md:hover:bg-purple-12": variant === 'outline',
  })

  const handleClick = () => {
    if (!disabled) onClick();
  }

  return <button disabled={disabled} className={buttonClasses} onClick={handleClick}>{icon}{label}</button>
}

export default Button;
