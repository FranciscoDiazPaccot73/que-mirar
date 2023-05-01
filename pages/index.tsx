/* eslint-disable prettier/prettier */
import type { NextPage } from 'next';
import { useContext, useEffect, useRef, useState } from 'react';

import ContentTitle from '@components/ContentTitle';
import Filters from '@components/Filters';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Layout from '@components/Layout';
import Seo from '@components/Seo';

import { updateParams } from '@utils/index';

import {
  getGenres,
  getInfo, getInitialRecomendations, getNextRecomendationCached, getProviders,
  getRecomendation,
  getSimilars, resetValues, setContent,
  setProvider,
  setRecomended,
  setSelectedGenre,
  setSimilars,
  setWatchRegion
} from '@store/actions';
import { PageContext } from '@store/index';
import { getdata } from './api';

type HomeProps = {
  region: string;
  source: string;
  initialTab: number;
  initialResult: any;
  initialRest: any;
};

const Home: NextPage<HomeProps> = ({ region, source: contextSource, initialResult, initialRest, initialTab }) => {
  const {
    dispatch,
    state: { content, watchRegion = 'AR', noContent, selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent, nextRecomendations },
  } = useContext(PageContext);
  const [linkSelected, handleTabChange] = useState(initialTab);
  const [source, setSource] = useState('tv');
  const [isFirst, setFirst] = useState(true);
  const timestamp = useRef(new Date());
  const firstRunFinished = useRef(false);

  useEffect(() => {
    if (contextSource && contextSource !== 'movie') {
      handleTabChange(contextSource === 'tv' ? 1 : 0);
      setSource(contextSource);
    }

    if (region) {
      setWatchRegion(dispatch, region);
    }
  }, [contextSource, region]);

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
    
    if (!firstRunFinished.current) {
      firstRunFinished.current = true
      getInitialRecomendations(dispatch, params.source ?? 'tv', 0, params.region ?? 'AR')
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('spinner');
      const body = document.getElementById('body');

      if (loader && body) {
        const diffTimes = new Date().getTime() - timestamp.current.getTime();

        if (diffTimes < 250) {
          setTimeout(() => {
            loader.style.display = 'none';
            body.classList.remove('scroll-disabled');
          }, 500);
        } else {
          loader.style.display = 'none';
          body.classList.remove('scroll-disabled');
        }
      }
    }
  }, [noContent]);

  const getPageData = async (newSource: string) => {
    await getProviders(dispatch, newSource);
    await getGenres(dispatch, newSource);
  };

  const handleTab = async (tab: number) => {
    if (tab !== linkSelected) {
      const newSource = tab === 0 ? 'movie' : 'tv';

      resetValues(dispatch)
      setFirst(true);
      handleTabChange(tab);
      setSource(newSource);
      setProvider(dispatch, 0);
      setSelectedGenre(dispatch, 0);
      getPageData(newSource);
      const newId = await getInfo(dispatch, newSource);

      getInitialRecomendations(dispatch, newSource, 0, watchRegion)

      updateParams({ newSource, newWatchRegion: watchRegion, id: newId });
    }
  };

  const nextRecomendation = async () => {
    resetValues(dispatch)
    setFirst(false);
    const [next] = nextRecomendations;
    const newId = await getNextRecomendationCached(dispatch, source, next.id, next, watchRegion);
    
    updateParams({ newSource: source, newWatchRegion: watchRegion, id: newId });
    getSimilars(dispatch, source, newId, watchRegion);
    getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, watchRegion);
  };

  const handleRegion = async (newRegion: string) => {
    resetValues(dispatch)
    setWatchRegion(dispatch, newRegion);
    setFirst(false);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, newRegion, true);

    getInitialRecomendations(dispatch, source, selectedProvider, watchRegion, selectedGenre);

    getSimilars(dispatch, source, content.id, watchRegion);
    updateParams({ newSource: source, newWatchRegion: newRegion, id: newId });
  };

  return (
    <div>
      <Seo />
      <Header handleTab={handleTab} linkSelected={linkSelected} />
      <main className="flex flex-1 flex-col mx-auto max-w-[565px] min-h-main pt-6 pb-8 px-8 md:max-w-[850px] md:min-h-main-desktop md:px-4 md:pt-4 md:pb-12">
        <ContentTitle
          isFirst={isFirst}
          nextRecomendation={nextRecomendation}
          setFirst={setFirst}
          source={source}
          watchRegion={watchRegion ?? 'AR'}
          onChange={handleRegion}
        />
        <Layout isFirst={isFirst} nextRecomendation={nextRecomendation} source={source} />
        <Filters source={source} />
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const { source = 'tv' } = query;
  const initialTab = source === 'tv' ? 1 : 0;

  const { result, rest } = await getdata({ source });

  return {
    props: {
      initialResult: JSON.parse(JSON.stringify(result)),
      initialRest: JSON.parse(JSON.stringify(rest)),
      initialTab,
      source,
    },
  };
}

export default Home;
