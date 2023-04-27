import type { NextPage } from 'next';
import { useState, useContext, useEffect, useRef } from 'react';
// import classNames from 'classnames';

// import Filters from '@components/Filters';
// import Layout from '@components/Layout';
import ContentTitle from '@components/ContentTitle';
import Footer from '@components/Footer';
import Header from '@components/Header';
import Seo from '@components/Seo';

import { updateParams } from '@utils/index';

import { PageContext } from '@store/index';
import {
  setWatchRegion,
  getInfo,
  // getRecomendation,
  getGenres,
  getProviders,
  setProvider,
  setSelectedGenre,
  // getSimilars,
  setContent,
  setRecomended,
  setSimilars,
} from '@store/actions';
import { getdata } from './api';

// import styles from '@styles/Home.module.scss'

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
    // state: { content, watchRegion, noContent, selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent },
    state: { watchRegion, noContent },
  } = useContext(PageContext);
  const [linkSelected, handleTabChange] = useState(initialTab);
  const [source, setSource] = useState('tv');
  const [contentId, setId] = useState<string | null>(null);
  const [isFirst, setFirst] = useState(true);
  const timestamp = useRef(new Date());

  console.log(source, contentId, isFirst);

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
      setId(params.id);
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

      setFirst(true);
      handleTabChange(tab);
      setSource(newSource);
      setProvider(dispatch, 0);
      setSelectedGenre(dispatch, 0);
      getPageData(newSource);
      const newId = await getInfo(dispatch, newSource);

      updateParams({ newSource, newWatchRegion: watchRegion, id: newId });
    }
  };
  /*
  const nextRecomendation = async () => {
    setFirst(false);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, watchRegion);

    updateParams({ newSource: source, newWatchRegion: watchRegion, id: newId });
    getSimilars(dispatch, source, content.id, watchRegion);
    trackEvent('CLICK', 'recomendation');
  };

  const handleRegion = async (newRegion: string) => {
    setWatchRegion(dispatch, newRegion);
    trackEvent('CLICK', `region-${newRegion}`);
    setFirst(false);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, newRegion);

    getSimilars(dispatch, source, content.id, watchRegion);
    updateParams({ newSource: source, newWatchRegion: newRegion, id: newId });
  }; */

  // const mainClasses = classNames(styles.main, device && device === 'desktop' && styles.main_desktop);

  return (
    <div>
      <Seo />
      <Header handleTab={handleTab} linkSelected={linkSelected} />
      <main className="flex flex-1 flex-col mx-auto max-w-[565px] min-h-main pt-6 pb-8 px-8 md:max-w-[850px] md:min-h-main-desktop md:px-4 md:pt-4 md:pb-12">
        <ContentTitle
          isFirst={isFirst}
          // nextRecomendation={nextRecomendation}
          setFirst={setFirst}
          source={source}
          watchRegion={watchRegion ?? 'AR'}
          // onChange={handleRegion}
        />
        {/*
          <Layout contentId={contentId} device={device} source={source} nextRecomendation={nextRecomendation} isFirst={isFirst} />
          <Filters source={source} device={device} />
        */}
      </main>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  const { source = 'tv' } = query;
  const initialTab = source === 'tv' ? 1 : 2;

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
