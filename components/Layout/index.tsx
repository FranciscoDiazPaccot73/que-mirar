import dynamic from 'next/dynamic'

const Mobile = dynamic(() => import('../MobileView'))
const Desktop = dynamic(() => import('../DesktopView'))

export interface Props {
  device: string|null,
  source: string,
  nextRecomendation(): void,
  isFirst: boolean,
}

const Layout = (props: Props) => {
  const { device } = props;
  
  if (!device) return null;

  if (device === 'mobile') return <Mobile {...props} />
  if (device === 'desktop') return <Desktop {...props} />
  
  return null;
}

export default Layout;
