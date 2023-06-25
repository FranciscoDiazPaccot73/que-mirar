import { FC, ReactNode } from 'react';
import Link from 'next/link';

type LinkProps = {
  classes: string;
  href: string;
  label: string;
  icon?: ReactNode;
};

const LinkButton: FC<LinkProps> = ({ classes, href, label, icon }) => (
  <Link className={classes} href={href}>
    {icon}
    {label}
  </Link>
);

export default LinkButton;
