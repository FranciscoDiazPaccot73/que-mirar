import { FC, ReactNode } from 'react';
import Link from 'next/link';

type LinkProps = {
  classes: string;
  href: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
};

const LinkButton: FC<LinkProps> = ({ classes, href, label, icon, onClick = () => {} }) => (
  <Link className={classes} href={href} onClick={onClick}>
    {icon}
    {label}
  </Link>
);

export default LinkButton;
