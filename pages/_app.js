import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import Head from "next/head";
import SEO from "./SEO";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log(String(process.env.NODE_ENV));
    if (process.env.NODE_ENV === "production") {
      hotjar.initialize(3300873, 6);
    }
  }, []);
  return (
    <ChakraProvider>
      <Head>
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7343484395424686"
          crossorigin="anonymous"
        ></script> */}
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="logo.png" />
        <link rel="icon" href="logo.png" />
        <link ref="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <SEO />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
