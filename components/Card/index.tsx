import { useContext } from 'react';

import classNames from 'classnames';
import NoContent from '../icons/NoData';
import Content from './Content';

import { PageContext } from '../../context';

interface Props {
  source: string;
  nextRecomendation?: () => void;
  // contentId?: string | null;
}

const Card = ({ source, nextRecomendation }: Props) => {
  const {
    state: { noContent },
  } = useContext(PageContext);

  const cardClasses = classNames('rounded rounded-md border border-purple w-full flex min-h-[400px] md:min-h-[500px]', {
    'max-h-[500px] p-4': noContent,
  });

  return (
    <div className={cardClasses}>
      {noContent ? <NoContent height="400px" width="100%" /> : <Content nextRecomendation={nextRecomendation} source={source} />}
    </div>
  );
};

Card.defaultProps = {
  nextRecomendation: () => {},
};

export default Card;
