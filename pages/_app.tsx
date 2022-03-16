import type { AppProps } from 'next/app'
import Head from 'next/head'

import { Navbar } from '../components'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Component {...pageProps} />
    </>
    
    
  )
}

export default MyApp
