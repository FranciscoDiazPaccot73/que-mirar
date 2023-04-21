import type { NextPage } from 'next'
import { useState, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { isMobile } from 'react-device-detect';

import Filters from '@components/Filters';
import Layout from '@components/Layout';
import Header from '@components/Header';
import Seo from '@components/Seo';
import Footer from '@components/Footer';
import ContentTitle from '@components/ContentTitle';

import { getdata } from './api';
import { getDeviceTrackWording, updateParams } from '@utils/index';
import { trackView, trackEvent } from '@utils/trackers';

import { PageContext } from '@store/index';
import {
  setWatchRegion,
  getInfo,
  getRecomendation,
  getGenres,
  getProviders,
  setProvider,
  setSelectedGenre,
  getSimilars,
  setContent,
  setRecomended,
  setSimilars,
} from '@store/actions';

//import styles from '@styles/Home.module.scss'

type HomeProps = {
  region: string
  source: string
  initialTab: number
  initialResult: any
  initialRest: any
}

const Home: NextPage<HomeProps> = ({ region, source: contextSource, initialResult, initialRest, initialTab }) => {
  const { dispatch, state: { content, watchRegion, noContent, selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent } } = useContext(PageContext);
  const [linkSelected, handleTabChange] = useState(initialTab);
  const [device, setDevice] = useState<string>();
  const [source, setSource] = useState('tv');
  const [contentId, setId] = useState<string|null>(null);
  const [isFirst, setFirst] = useState(true);
  const timestamp = useRef(new Date());
  // const mainClasses = classNames(styles.main, device && device === 'desktop' && styles.main_desktop);

  useEffect(() => {
    if (contextSource && contextSource !== 'movie') {
      handleTabChange(contextSource === 'tv' ? 1 : 0)
      setSource(contextSource)
    }

    if (region) {
      setWatchRegion(dispatch, region)
    }
  }, [contextSource, region]);

  useEffect(() => {
    setContent(dispatch, initialResult)
    setRecomended(dispatch, initialResult.id)
    setSimilars(dispatch, initialRest)
    const dev = isMobile ? 'mobile' : 'desktop';
    setDevice(dev);
    trackView('/home');
    const trackWording = getDeviceTrackWording(dev);
    trackEvent('DEVICE', trackWording)
    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop: any) => searchParams.get(prop),
    });

    if (params.source || params.region || params.id) {
      setSource(params.source || 'tv');
      setWatchRegion(dispatch, params.region || 'AR')
      setId(params.id)
    }
  }, [])

  useEffect(() => {
    if (noContent) {
    }

    if (device && typeof window !== 'undefined') {
      const loader = document.getElementById('spinner');
      const body = document.getElementById('body');

      if (loader && body) {
        const diffTimes = new Date().getTime() - timestamp.current.getTime();
        if (diffTimes < 250) {
          setTimeout(() => {
            loader.style.display = 'none';
            body.classList.remove("scroll-disabled");
          }, 500);
        } else {
          loader.style.display = 'none';
          body.classList.remove("scroll-disabled");
        }
      }
    }
  }, [noContent, device])

  const getPageData = async (newSource: string) => {
    await getProviders(dispatch, newSource);
    await getGenres(dispatch, newSource);
  }

  const handleTab = async (tab: number) => {
    if (tab !== linkSelected) {
      const newSource = tab === 0 ? 'movie' : 'tv';
      setFirst(true);
      handleTabChange(tab);
      setSource(newSource)
      setProvider(dispatch, 0);
      setSelectedGenre(dispatch, 0);
      getPageData(newSource);
      trackEvent('TAB', newSource)
      const newId = await getInfo(dispatch, newSource);
      updateParams({ newSource, newWatchRegion: watchRegion, id: newId })
    }
  }

  const nextRecomendation = async () => {
    setFirst(false);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, watchRegion)
    updateParams({ newSource: source, newWatchRegion: watchRegion, id: newId })
    getSimilars(dispatch, source, content.id, watchRegion)
    trackEvent('CLICK', 'recomendation')
  }

  const handleRegion = async (newRegion: string) => {
    setWatchRegion(dispatch, newRegion)
    trackEvent('CLICK', `region-${newRegion}`)
    setFirst(false);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, newRegion)
    getSimilars(dispatch, source, content.id, watchRegion)
    updateParams({ newSource: source, newWatchRegion: newRegion, id: newId })
  }

  return (
    <div>
      <Seo />
      <Header device={device} handleTab={handleTab} linkSelected={linkSelected} />
      {/*
        <main className={mainClasses}>
          <ContentTitle
            nextRecomendation={nextRecomendation}
            source={source}
            onChange={handleRegion}
            watchRegion={watchRegion ?? 'AR'}
            isFirst={isFirst}
            setFirst={setFirst}
          />
          <Layout contentId={contentId} device={device} source={source} nextRecomendation={nextRecomendation} isFirst={isFirst} />
          <Filters source={source} device={device} />
        </main>
        <Footer />
      */}
    </div>
  )
}

export async function getServerSideProps({ query }: any) {
  const { source = 'tv' } = query;
  const initialTab = source === 'tv' ? 1 : 2;

  const { result, rest } = await getdata({ source })

  return {
    props: {
      initialResult: JSON.parse(JSON.stringify(result)),
      initialRest: JSON.parse(JSON.stringify(rest)),
      initialTab,
      source,
    }
  }
}

export default Home
