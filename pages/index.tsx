/* eslint-disable prettier/prettier */
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

import ContentTitle from '@components/ContentTitle';
import Layout from '@components/Layout';

import { updateParams } from '@utils/index';

import {
  getRecomendation,
  getSimilars, resetValues, setContent,
  setRecomended,
  setSimilars,
  setWatchRegion
} from '@store/actions';
import { PageContext } from '@store/index';
import { AnimatePresence, motion } from 'framer-motion';
import { getdata } from './api';

import { ContentInterface } from './types';

type TvTrendsProps = {
  region: string;
  source: string;
  initialTab: number;
  initialResult: ContentInterface;
  initialRest: ContentInterface[];
};

const TvTrends: NextPage<TvTrendsProps> = ({ region, initialResult, initialRest }) => {
  const {
    dispatch,
    state: { content, isModalOpen, watchRegion = 'AR', selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent },
  } = useContext(PageContext);
  const [source, setSource] = useState('tv');

  useEffect(() => {
    if (region) {
      setWatchRegion(dispatch, region);
    }
  }, [region]);

  useEffect(() => {
    setContent(dispatch, initialResult);
    setRecomended(dispatch, initialResult.id);
    setSimilars(dispatch, initialRest);

    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: any) => searchParams.get(prop),
    });

    if (params.source || params.region || params.id) {
      setSource(params.source || 'tv');
      setWatchRegion(dispatch, params.region || 'AR');
    }
  }, []);

  const handleRegion = async (newRegion: string) => {
    resetValues(dispatch)
    setWatchRegion(dispatch, newRegion);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, newRegion, true);

    getSimilars(dispatch, source, content.id, watchRegion);
    updateParams({ newSource: source, newWatchRegion: newRegion, id: newId });
  };

  return (
    <div className='relative'>
      <main className="mt-[86px] flex flex-1 flex-col mx-auto max-w-[565px] min-h-main pt-6 pb-8 md:max-w-[1000px] md:min-h-main-desktop md:px-8 md:pt-4 md:pb-12 md:mt-28">
        <ContentTitle
          search='trends'
          source={source}
          watchRegion={watchRegion ?? 'AR'}
          onChangeRegion={handleRegion}
        />
        <AnimatePresence>
          <motion.div
            animate={isModalOpen ? { scale: 0.95, opacity: .5 } : { scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <Layout search='trends' source={source} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const { result, rest } = await getdata({ source: 'tv' });

  return {
    props: {
      initialResult: JSON.parse(JSON.stringify(result)),
      initialRest: JSON.parse(JSON.stringify(rest)),
    },
  };
}

export default TvTrends;
