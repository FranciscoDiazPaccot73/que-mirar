/* eslint-disable prettier/prettier */
import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';

import ContentTitle from '@components/ContentTitle';
import Header from '@components/Header';
import Layout from '@components/Layout';

import { updateParams } from '@utils/index';

import {
  getGenres,
  getInfo, getNextRecomendationCached, getProviders,
  getRecomendation,
  getSimilars, resetValues, setContent,
  setProvider,
  setRecomended,
  setSelectedGenre,
  setWatchRegion,
  setNextRecomendation,
} from '@store/actions';
import { PageContext } from '@store/index';
import { AnimatePresence, motion } from 'framer-motion';
import { getInitialRecomendations } from './api/recomendation-initial';

import { ContentInterface } from './types';

type HomeProps = {
  region: string;
  source: string;
  initialTab: number;
  initialResult: ContentInterface[];
};

const Home: NextPage<HomeProps> = ({ region, source: contextSource, initialResult, initialTab }) => {
  const {
    dispatch,
    state: { content, isModalOpen, watchRegion = 'AR', selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent, nextRecomendations },
  } = useContext(PageContext);
  const [linkSelected, handleTabChange] = useState(initialTab);
  const [source, setSource] = useState('tv');

  useEffect(() => {
    if (contextSource && contextSource !== 'movie') {
      handleTabChange(contextSource === 'tv' ? 1 : 0);
      setSource(contextSource);
    }

    if (region) {
      setWatchRegion(dispatch, region);
    }
  }, [contextSource, region]);

  const getPageData = async (newSource: string) => {
    await getProviders(dispatch, newSource);
    await getGenres(dispatch, newSource);
  };

  useEffect(() => {
    const [firstResult, second] = initialResult

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
  }, []);

  const handleTab = async (tab: number) => {
    if (tab !== linkSelected) {
      const newSource = tab === 0 ? 'movie' : 'tv';

      resetValues(dispatch)
      handleTabChange(tab);
      setSource(newSource);
      setProvider(dispatch, 0);
      setSelectedGenre(dispatch, 0);
      getPageData(newSource);
      const newId = await getInfo(dispatch, newSource, 'today');

      updateParams({ newSource, newWatchRegion: watchRegion, id: newId });
    }
  };

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
      <Header handleTab={handleTab} linkSelected={linkSelected} />
      <main className="mt-[86px] flex flex-1 flex-col mx-auto max-w-[565px] min-h-main pt-6 pb-8 md:max-w-[1000px] md:min-h-main-desktop md:px-4 md:pt-4 md:pb-12 md:mt-28">
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

export async function getServerSideProps() {
  const { result } = await getInitialRecomendations({ source: 'tv', region: 'AR', provider: '0', genre: '' });

  return {
    props: {
      initialResult: JSON.parse(JSON.stringify(result)),
      initialTab: 1,
      source: 'tv',
    },
  };
}

export default Home;
