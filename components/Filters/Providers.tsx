import classNames from 'classnames';
import Image from 'next/image';
import { FC, KeyboardEvent, useContext } from 'react';

import Skeleton from '../Skeleton';

import { PageContext } from '../../context';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

type ProvidersProps = {
  handleFilter: (id: number) => void;
};

export type ProviderType = {
  display_priorities: any;
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
};

const Providers: FC<ProvidersProps> = ({ handleFilter }) => {
  const {
    state: { selectedProvider = 0, providers },
  } = useContext(PageContext);
  const wrapperClasses = classNames(
    'cursor-pointer flex items-center justify-center bg-purple rounded-md border border-purple-50 text-filter-color font-semibold h-9 w-9 overflow-hidden md:mr-3',
    {
      'text-white bg-transparent': selectedProvider !== 0,
    },
  );
  let firstLineProviders = [];
  let secondLineProviders = []

  const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>, value: number) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleFilter(value);
    }
  };

  if (providers) {
    firstLineProviders = providers.slice(0, providers.length / 2);
    secondLineProviders = providers.slice(providers.length / 2, providers.length);
  }


  return (
    <div className="mb-8">
      <p className="text-xs text-white opacity-90">Plataformas de streaming</p>
      <div className="w-full grid grid-cols-5 gap-5 mt-3 justify-center md:gap-4 md:flex md:justify-start">
        {providers?.length ? (
          <>
            <div className={wrapperClasses} onClick={() => handleFilter(0)} onKeyUp={(e) => handleKeyUp(e, 0)}>
              <p className="text-center text-[10px]">TODAS</p>
            </div>
            {firstLineProviders.map((prov: ProviderType) => {
              const filtersClasses = classNames('cursor-pointer rounded-md border border-purple-50 h-9 w-9 overflow-hidden md:mr-3', {
                'border-none grayscale-90 md:hover:grayscale-0': selectedProvider !== prov.provider_id,
              });

              return (
                <div
                  key={prov.provider_id}
                  className={filtersClasses}
                  onClick={() => handleFilter(prov.provider_id)}
                  onKeyUp={(e) => handleKeyUp(e, prov.provider_id)}
                >
                  <Image alt={prov.provider_name} height={40} src={`${BASE_IMAGE_URL}${prov.logo_path}`} width={40} />
                </div>
              );
            })}
          </>
        ) : (
          <Skeleton type="providers" />
        )}
      </div>
      <div className="w-full grid grid-cols-5 gap-4 mt-3 justify-center md:gap-4 md:flex md:justify-start">
        {providers?.length ? (
          <>
            {secondLineProviders.map((prov: ProviderType) => {
              const filtersClasses = classNames('cursor-pointer rounded-md border border-purple-50 h-9 w-9 overflow-hidden md:mr-3', {
                'border-none grayscale-90 md:hover:grayscale-0': selectedProvider !== prov.provider_id,
              });

              return (
                <div
                  key={prov.provider_id}
                  className={filtersClasses}
                  onClick={() => handleFilter(prov.provider_id)}
                  onKeyUp={(e) => handleKeyUp(e, prov.provider_id)}
                >
                  <Image alt={prov.provider_name} height={40} src={`${BASE_IMAGE_URL}${prov.logo_path}`} width={40} />
                </div>
              );
            })}
          </>
        ) : (
          <Skeleton type="providers" />
        )}
      </div>
    </div>
  );
};

export default Providers;
