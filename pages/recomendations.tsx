/* eslint-disable prettier/prettier */
import type { NextPage } from 'next';
import { useContext, useEffect, useRef, useState } from 'react';

import ContentTitle from '@components/ContentTitle';
import Layout from '@components/Layout';

import { updateParams } from '@utils/index';

import {
  getNextRecomendationCached,
  getRecomendation,
  getSimilars, resetValues, setContent,
  setRecomended,
  setWatchRegion,
  getInitialRecomendations,
  setNextRecomendation,
} from '@store/actions';
import { PageContext } from '@store/index';
import { AnimatePresence, motion } from 'framer-motion';

import { ContentInterface } from './types';

type TvRecoProps = {
  region: string;
  source: string;
  initialTab: number;
  initialResult: ContentInterface[];
};

const TvReco: NextPage<TvRecoProps> = () => {
  const {
    dispatch,
    state: { content, isModalOpen, watchRegion = 'AR', selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent, nextRecomendations },
  } = useContext(PageContext);
  const [source, setSource] = useState('tv');
  const alreadyFetch = useRef(false)

  const getInitialData = async () => {
    const recomendationsData = await getInitialRecomendations(dispatch, 'tv', 0, 'AR')
    const [firstResult, second] = recomendationsData

    setContent(dispatch, firstResult);
    setRecomended(dispatch, firstResult.id);
    getSimilars(dispatch, source, firstResult.id, watchRegion);
    setNextRecomendation(dispatch, [second])

    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: any) => searchParams.get(prop),
    });

    if (params.source || params.region || params.id) {
      setSource(params.source || 'tv');
      setWatchRegion(dispatch, params.region || 'AR');
    }

  }
  
  useEffect(() => {
    if (!alreadyFetch.current) {
      alreadyFetch.current = true
      getInitialData()
    }
  }, []);

  const nextRecomendation = async () => {
    resetValues(dispatch)
    const [next] = nextRecomendations;
    const newId = await getNextRecomendationCached(dispatch, source, next.id, next, watchRegion);
    
    updateParams({ newSource: source, newWatchRegion: watchRegion, id: newId });
    getSimilars(dispatch, source, newId, watchRegion);
    getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, watchRegion);
  };

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
          search='recomendations'
          source={source}
          watchRegion={watchRegion ?? 'AR'}
          onChangeRegion={handleRegion}
        />
        <AnimatePresence>
          <motion.div
            animate={isModalOpen ? { scale: 0.95, opacity: .5 } : { scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
          >
            <Layout nextRecomendation={nextRecomendation} search='recomendations' source={source} />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TvReco;
