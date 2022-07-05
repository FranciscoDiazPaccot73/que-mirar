import { Box, Text } from "@chakra-ui/react";

import { trackEvent } from '../../utils/trackers';

import styles from '../../styles/Home.module.scss';

const Footer = () => (
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
)

export default Footer;
