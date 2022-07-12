import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactGA from 'react-ga';

import PageProvider from '../context/index';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const trackingId = process.env.GA_ID ?? '';
  if (process.env.NODE_ENV === 'production') ReactGA.initialize(trackingId);

  const router = useRouter();
  const { source = 'movie', region = 'AR' } = router.query;

  return (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <PageProvider>
            <Component {...pageProps} source={source} region={region} />
          </PageProvider>
        </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
