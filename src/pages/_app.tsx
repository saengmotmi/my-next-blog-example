import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { SWRConfig } from "swr";

import font from "styles/font";
import GlobalStyle from "styles/GlobalStyle";
import theme from "styles/theme";

import "github-markdown-css";

function MyApp({ Component, pageProps }: AppProps<{ fallback: any }>) {
  const { fallback } = pageProps;

  return (
    <>
      <Head>
        <title>My Next Blog</title>
        <style>{font}</style>
      </Head>
      <GlobalStyle />
      <SWRConfig value={{ fallback }}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
