import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import PageProvider from '@store/index';

import '@styles/globals.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
