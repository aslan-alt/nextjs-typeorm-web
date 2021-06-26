import Head from 'next/head'

import 'styles/global.scss'


export default function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>我的博客 - Frankssss</title>
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />

    </Head>
    <script src="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"></script>
    <Component {...pageProps} />
    <style jsx>
      {`
      .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
      `}
    </style>
  </>
}
