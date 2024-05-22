import { FC, PropsWithChildren } from "react";
import { LinkButton } from "./Link";
import { Button as ButtonComponent, ButtonProps as ShadButtonProps } from '../ui/button'

export interface ButtonProps extends ShadButtonProps {
  href?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ href, ...rest }) => {
  if (href) return <LinkButton href={href} {...rest} />;

  return (
    <ButtonComponent {...rest} />
  )
}