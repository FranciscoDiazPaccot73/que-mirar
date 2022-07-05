import dynamic from 'next/dynamic';

const Mobile = dynamic(() => import('./Mobile'));
const Desktop = dynamic(() => import('./Desktop'));

export interface Props {
  linkSelected: number|undefined,
  handleTab(tab: number): Promise<void>,
  device?: string|null,
}

const Header = (props: Props) => {
  const { device } = props;

  return (
    <header>
      {device === 'mobile' ? <Mobile {...props} /> : null}
      {device === 'desktop' ? <Desktop {...props} /> : null}
    </header>
  )
}

export default Header;
