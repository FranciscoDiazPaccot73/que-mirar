import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import { useState, useContext, useEffect, useRef } from 'react';

import { Text, Box, useToast } from '@chakra-ui/react'
import Filters from '../components/Filters';
import Layout from '../components/Layout';
import Header from '../components/Header';

import { trackView, trackEvent } from '../utils/trackers';

import { PageContext } from '../context';
import { getInfo, getRecomendation, getProviders, setProvider } from '../context/actions';

const Home: NextPage = () => {
  const { dispatch, state: { noContent, selectedGenre, selectedProvider = 0, recomendedContent = [], prevContent } } = useContext(PageContext);
  const [linkSelected, handleTabChange] = useState(0);
  const [device, setDevice] = useState<string|null>(null);
  const [source, setSource] = useState('movie');
  const [isFirst, setFirst] = useState(true);
  const timestamp = useRef(new Date());
  const toast = useToast();
  const mainClasses = classNames(styles.main, device && device === 'desktop' && styles.main_desktop);

  useEffect(() => {
    const dev = isMobile ? 'mobile' : 'desktop';
    setDevice(dev);
    trackView('/home');
    trackEvent('DEVICE', dev)
  }, [])

  useEffect(() => {
    if (noContent) {
      toast.closeAll();
      toast({
        title: 'No hay contenido para tu búsqueda.',
        description: "Prueba con una nueva combinación de filtros.",
        status: 'error',
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

  const getPageProviders = async () => {
    await getProviders(dispatch, source);
  }

  const handleTab = async (tab: number) => {
    if (tab !== linkSelected) {
      const newSource = tab === 0 ? 'movie' : 'tv';
      setFirst(true);
      handleTabChange(tab);
      setSource(newSource)
      setProvider(dispatch, 0);
      getPageProviders();
      trackEvent('TAB', newSource)
      await getInfo(dispatch, newSource);
    }
  }

  const nextRecomendation = () => {
    toast.closeAll();
    setFirst(false);
    getRecomendation(dispatch, source, recomendedContent, prevContent, selectedProvider, selectedGenre)
    trackEvent('CLICK', 'recomendation')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>¿Qué puedo ver?</title>
        <meta name="description" content="Si no sabes que serie o pelicula empezar a ver, este es tu lugar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header device={device} handleTab={handleTab} linkSelected={linkSelected} />
      <main className={mainClasses}>
        <Text fontSize="xl" marginBottom="16px">{`${isFirst ? 'Tendencias de la semana' : 'Otras recomendaciones'}`}</Text>
        <Layout device={device} source={source} nextRecomendation={nextRecomendation} />
        <Filters source={source} device={device} />
      </main>
      <footer className={styles.footer}>
        <Box fontSize="18px" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by
            <span className={styles.logo}>
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="THE MOVIE DB"
                width={84}
                height={32}
              />
            </span>
          </a>
          <Text color='gray.400' textAlign="center" style={{ fontSize: '10px' }}>This product uses the TMDB API but is not endorsed or certified by TMDB.</Text>
        </Box>
        <Box className={styles.dev} onClick={() => trackEvent('CLICK', 'dev')}>
          Created by <a href='https://franciscodiazpaccot.dev' target="_blank" rel="noreferrer noopener">
          Francisco Diaz Paccot</a>
        </Box>
      </footer>
    </div>
  )
}

export default Home
