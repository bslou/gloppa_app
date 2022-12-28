import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import Head from "next/head";
import SEO from "./SEO";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7343484395424686"
          crossorigin="anonymous"
        ></script>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="icon" href="favicon.ico" />
        <link ref="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <SEO />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
