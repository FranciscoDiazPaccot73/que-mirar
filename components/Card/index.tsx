/* eslint-disable react/require-default-props */
import { useContext } from 'react';

import Content from './Content';
import NoContent from '../icons/NoData';

import { PageContext } from '../../context';
import classNames from 'classnames';

// const Mobile = dynamic(() => import('./Mobile'));
//const Desktop = dynamic(() => import('./Desktop'));

interface Props {
  source: string;
  device?: string;
  nextRecomendation?(): void;
  contentId?: string | null;
}

const Card = ({ source, device, nextRecomendation }: Props) => {
  const { state: { noContent } } = useContext(PageContext);

  const cardClasses = classNames('rounded rounded-md border border-purple w-full flex min-h-[400px]', {
    'max-h-[500px] p-4': noContent,
  })

  return (
    <div className={cardClasses}>
      {noContent ? <NoContent height="400px" width="100%" /> : <Content source={source} />}
    </div>
  );

  {/**
    if (device === 'mobile') {
      return (
        <div>
          <Mobile source={source} />
        </div>
      );
    }

    return (
      <div minHeight="500px">
        <Desktop nextRecomendation={nextRecomendation} source={source} />
      </div>
    );
  */}

};

export default Card;
