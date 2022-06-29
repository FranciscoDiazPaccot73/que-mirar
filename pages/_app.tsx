import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

import PageProvider from '../context/index';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <PageProvider>
            <Component {...pageProps} />
          </PageProvider>
        </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
