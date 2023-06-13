import classNames from 'classnames';
import { FC, ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  label?: string;
  h?: string;
  variant?: string;
  icon?: ReactNode;
  disabled?: boolean;
  customClass?: string;
  color?: string;
  size?: string;
};

const Button: FC<ButtonProps> = ({ onClick, label, variant, icon, disabled, customClass, h, color, size }) => {
  const buttonClasses = classNames(
    'inline-flex appearance-none items-center gap-3 justify-center relative select-none outline-none outline-offset-2 rounded-md font-semibold px-4 py-2',
    `h-${h}`,
    `text-${size}`,
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

  const handleClick = () => {
    if (!disabled) onClick();
  };

  return (
    <button className={buttonClasses} disabled={disabled} onClick={handleClick}>
      {icon}
      {label}
    </button>
  );
};

Button.defaultProps = {
  variant: 'solid',
  label: '',
  icon: null,
  disabled: false,
  customClass: '',
  h: '7',
  color: 'purple',
  size: 'xs',
};

export default Button;
