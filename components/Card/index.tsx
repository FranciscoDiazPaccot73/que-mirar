import { FC, useContext } from 'react';

import classNames from 'classnames';
import NoContent from '../icons/NoData';
import Content from './Content';

import { PageContext } from '../../context';

type CardProps = {
  source: string;
  search: string;
  nextRecomendation?: () => void;
};

const Card: FC<CardProps> = ({ source, nextRecomendation, search }) => {
  const {
    state: { noContent },
  } = useContext(PageContext);

  const cardClasses = classNames(
    'w-full overflow-hidden flex min-h-[400px] border-y border-purple-12 mt-3 py-3 md:py-0 md:mt-0 md:min-h-[500px] md:rounded md:rounded-md md:border md:border-purple',
    {
      'max-h-[500px] p-4': noContent,
    },
  );

  return (
    <div className={cardClasses}>
      {noContent ? (
        <NoContent height="600px" width="100%" />
      ) : (
        <Content nextRecomendation={nextRecomendation} search={search} source={source} />
      )}
    </div>
  );
};

Card.defaultProps = {
  nextRecomendation: () => {},
};

export default Card;
