import { FC, useContext } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import Skeleton from '../Skeleton';

import { PageContext } from '../../context';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

interface ProvidersProps {
  handleFilter: (id: number) => void,
}

const Providers: FC<ProvidersProps> = ({ handleFilter }) => {
  const { state: { selectedProvider = 0, providers } } = useContext(PageContext);
  const wrapperClasses = classNames('cursor-pointer flex items-center justify-center bg-purple rounded-md border border-purple text-filter-color font-semibold h-9 w-9 overflow-hidden mr-3', {
    'text-white bg-transparent': selectedProvider !== 0
  });

  return (
    <div className='mb-8'>
      <p className='text-xs text-white opacity-90'>Filtrar por plataforma de streaming</p>
      <div className='w-full flex mt-3 justify-center md:justify-start' >
        {providers?.length ? (
          <>
            <div onClick={() => handleFilter(0)} className={wrapperClasses}>
              <p className='text-center text-[10px]'>TODAS</p>
            </div>
            {providers.map((prov: any) => {
              const filtersClasses = classNames('cursor-pointer rounded-md border border-purple h-9 w-9 overflow-hidden mr-3', {
                'border-none grayscale-90 md:hover:grayscale-0': selectedProvider !== prov.provider_id,
              });

              return (
                <div key={prov.provider_id} onClick={() => handleFilter(prov.provider_id)} className={filtersClasses}>
                  <Image alt={prov.provider_name} src={`${BASE_IMAGE_URL}${prov.logo_path}`} height={40} width={40} />
                </div>
              )
            })}
          </>
        ) : <Skeleton type='providers' />}
      </div>
    </div>
  )
}

export default Providers;
