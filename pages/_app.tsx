import Head from 'next/head'
import type { AppProps } from 'next/app'
import 'styles/global.scss'


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>我的博客 - Frankssss</title>

      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
    </Head>
    <Component {...pageProps} />
  </>
}
