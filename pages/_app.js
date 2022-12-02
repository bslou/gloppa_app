import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import Head from "next/head";
import SEO from "./SEO";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link ref="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <SEO />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
