import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';
import { cn } from '@/lib/utils';
import { ButtonProps as ShadButtonProps, buttonVariants } from '../ui/button'

interface ButtonProps extends ShadButtonProps {
  href?: string;
}

const LinkButton: FC<PropsWithChildren<ButtonProps>> = ({ className, href, children, size, variant }) => (
  <Link className={cn(buttonVariants({ variant, size, className }))} href={href as Url}>
    {children}
  </Link>
);

export default LinkButton;
