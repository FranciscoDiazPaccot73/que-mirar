import { ColorModeScript, Box } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import ReactGA from 'react-ga';

import loader from '../loader';

export default class Document extends NextDocument {
  render() {
    const trackingId = process.env.GA_ID ?? '';
    ReactGA.initialize(trackingId);

    return (
      <Html lang='es' style={{ background: "#1a202c" }} >
        <Head />
        <head>
          <style>
            {loader}
          </style>
        </head>
        <body id="body" className="scroll-disabled">
          <Box id="spinner">
            <Box className='spinner' />
          </Box>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
