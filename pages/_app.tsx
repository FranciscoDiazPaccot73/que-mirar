import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactGA from 'react-ga';

import PageProvider from '@store/index';

import '@styles/globals.scss'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const trackingId = process.env.GA_ID ?? '';
  if (process.env.NODE_ENV === 'production') ReactGA.initialize(trackingId);

  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
    </QueryClientProvider>
  )
}

export default MyApp
