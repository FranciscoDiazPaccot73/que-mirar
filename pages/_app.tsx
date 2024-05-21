import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { init } from '@amplitude/analytics-browser';

import Seo from '@components/Seo';
import Footer from '@components/Footer';
import Header from '@components/Header';
import PageProvider from '@store/index';

import '@styles/globals.scss';

const queryClient = new QueryClient();
const { NEXT_PUBLIC_AMPLITUDE_API_KEY } = process.env;

function MyApp({ Component, pageProps }: AppProps) {
  if (NEXT_PUBLIC_AMPLITUDE_API_KEY) {
    init(NEXT_PUBLIC_AMPLITUDE_API_KEY);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <Seo />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </PageProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
