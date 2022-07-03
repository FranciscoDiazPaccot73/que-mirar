import Card from '../Card';

interface Props {
  source: string,
  nextRecomendation: any,
  device: string|null,
};

const Desktop = ({ source, nextRecomendation, device }: Props) => <Card source={source} device={device} nextRecomendation={nextRecomendation} />

export default Desktop;