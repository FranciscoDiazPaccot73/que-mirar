import type { NextPage } from 'next'
import { useState, useContext, useEffect, useRef } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import { useToast } from '@chakra-ui/react'
import Filters from '../components/Filters';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import ContentTitle from '../components/ContentTitle';

import { getDeviceTrackWording } from '../utils';
import { trackView, trackEvent } from '../utils/trackers';
import { getdata } from './api';

import { PageContext } from '../context';
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
} from '../context/actions';

type params = {
  newSource: string,
  newWatchRegion: string,
  id?: string
}

const Home: NextPage = ({ region, source: contextSource, initialResult, initialRest, initialTab }: any) => {
  const { dispatch, state: { content, watchRegion, noContent, selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent } } = useContext(PageContext);
  const [linkSelected, handleTabChange] = useState(initialTab);
  const [device, setDevice] = useState<string|null>(null);
  const [source, setSource] = useState('tv');
  const [contentId, setId] = useState<string|null>(null);
  const [isFirst, setFirst] = useState(true);
  const timestamp = useRef(new Date());
  const toast = useToast();
  const mainClasses = classNames(styles.main, device && device === 'desktop' && styles.main_desktop);

  const updateParams = ({ newSource, newWatchRegion, id }: params) => {
    const sourceParam = `?source=${newSource}`
    const regionParam = `&region=${newWatchRegion}`
    const idParam = id ? `&id=${id}` : '';
    if (id) setId(id)
    window.history.replaceState({}, '', `${sourceParam}${regionParam}${idParam}`)
  }

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
      toast.closeAll();
      toast({
        title: noContent.message,
        description: noContent.message ? "Prueba con una nueva combinación de filtros." : null,
        status: noContent.type,
        duration: 3000,
        isClosable: true,
        position: "top",
      })
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
    toast.closeAll();
    setFirst(false);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, watchRegion)
    updateParams({ newSource: source, newWatchRegion: watchRegion, id: newId })
    getSimilars(dispatch, source, content.id, watchRegion)
    trackEvent('CLICK', 'recomendation')
  }

  const handleRegion = async (newRegion: string) => {
    setWatchRegion(dispatch, newRegion)
    trackEvent('CLICK', `region-${newRegion}`)
    toast.closeAll();
    setFirst(false);
    const newId = await getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, newRegion)
    getSimilars(dispatch, source, content.id, watchRegion)
    updateParams({ newSource: source, newWatchRegion: newRegion, id: newId })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>¿Qué puedo ver?</title>
        <meta name="description" content="Si no sabes que serie o pelicula empezar a ver, este es tu lugar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Seo />
      <Header device={device} handleTab={handleTab} linkSelected={linkSelected} />
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
    }
  }
}

export default Home
