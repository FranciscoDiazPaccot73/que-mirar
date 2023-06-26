import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import Seo from '@components/Seo';
import Footer from '@components/Footer';
import Header from '@components/Header';
import PageProvider from '@store/index';

import '@styles/globals.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
