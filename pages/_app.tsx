import React from 'react';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import 'styles/global.scss';
import {SessionProvider} from 'next-auth/react';
export default function App({Component, pageProps}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>唯热爱可抵岁月漫长</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
