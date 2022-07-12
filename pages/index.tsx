import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import { useState, useContext, useEffect, useRef } from 'react';

import { useToast } from '@chakra-ui/react'
import Filters from '../components/Filters';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import ContentTitle from '../components/ContentTitle';

import { getDeviceTrackWording } from '../utils';
import { trackView, trackEvent } from '../utils/trackers';

import { PageContext } from '../context';
import { setWatchRegion, getInfo, getRecomendation, getGenres, getProviders, setProvider, setSelectedGenre } from '../context/actions';

type params = {
  newSource: string,
  newWatchRegion: string,
}

const Home: NextPage = ({ region, source: contextSource }: any) => {
  const { dispatch, state: { watchRegion, noContent, selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent } } = useContext(PageContext);
  const [linkSelected, handleTabChange] = useState(0);
  const [device, setDevice] = useState<string|null>(null);
  const [source, setSource] = useState('movie');
  const [isFirst, setFirst] = useState(true);
  const timestamp = useRef(new Date());
  const toast = useToast();
  const mainClasses = classNames(styles.main, device && device === 'desktop' && styles.main_desktop);

  const updateParams = ({ newSource, newWatchRegion }: params) => {
    const sourceParam = `?source=${newSource}`
    const regionParam = `&region=${newWatchRegion}`
    window.history.replaceState({}, '', `${sourceParam}${regionParam}`)
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
    const dev = isMobile ? 'mobile' : 'desktop';
    setDevice(dev);
    trackView('/home');
    const trackWording = getDeviceTrackWording(dev);
    trackEvent('DEVICE', trackWording)
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
  }, [noContent])

  useEffect(() => {
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
  }, [device]);

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
      await getInfo(dispatch, newSource);
      updateParams({ newSource, newWatchRegion: watchRegion })
    }
  }

  const nextRecomendation = () => {
    toast.closeAll();
    setFirst(false);
    getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, watchRegion)
    trackEvent('CLICK', 'recomendation')
  }

  const handleRegion = (newRegion: string) => {
    setWatchRegion(dispatch, newRegion)
    trackEvent('CLICK', `region-${newRegion}`)
    toast.closeAll();
    setFirst(false);
    getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre, newRegion)
    updateParams({ newSource: source, newWatchRegion: newRegion })
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
        <ContentTitle onChange={handleRegion} watchRegion={watchRegion ?? 'AR'} isFirst={isFirst}  />
        <Layout device={device} source={source} nextRecomendation={nextRecomendation} />
        <Filters source={source} device={device} />
      </main>
      <Footer />
    </div>
  )
}

export default Home
