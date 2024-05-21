import { FC, ReactNode } from 'react';
import classNames from 'classnames';

export type ButtonProps = {
  onClick?: () => void;
  href?: string;
  label?: string;
  h?: string;
  variant?: 'solid' | 'outline' | 'transparent';
  icon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  customClass?: string;
  color?: string;
  size?: string;
  title?: string
};

const Button: FC<ButtonProps> = ({ onClick, label = '', variant = 'solid', icon, disabled, customClass, h = '7', color = 'purple', size = 'sm', href, rightIcon, title }) => {
  const buttonClasses = classNames(
    'inline-flex appearance-none items-center gap-3 justify-center relative select-none outline-none outline-offset-2 rounded-md font-semibold px-4 py-2',
    `text-${size}`,
    `h-${h}`,
    customClass,
    {
      'text-black bg-purple md:hover:bg-purple-hover': variant === 'solid',
      'bg-transparent border': variant === 'outline',
      'text-purple md:hover:bg-purple-12': variant === 'transparent',
      'text-white opacity-90': variant === 'transparent' && color === 'gray',
      'text-purple border-purple md:hover:bg-purple-12': variant === 'outline' && color === 'purple',
      'border-white border-opacity-30 md:hover:border-opacity-40': variant === 'outline' && color === 'gray',
      'cursor-not-allowed opacity-50': disabled,
    },
  );

  if (href) return null

  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  return (
    <button className={buttonClasses} disabled={disabled} title={title} onClick={handleClick}>
      {icon}
      {label}
      {rightIcon}
    </button>
  );
};

export default Button;
