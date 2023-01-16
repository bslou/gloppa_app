import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import Head from "next/head";
import SEO from "./SEO";
import { isMobile } from "react-device-detect";
import { hotjar } from "react-hotjar";
import { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    //screen.orientation.lock("landscape");
    if (isMobile) {
      function handleOrientationChange() {
        if (window.matchMedia("(orientation: portrait)").matches) {
          //setOrientation("vertical");
          toast({
            title: "Please flip horiontally for full experience",
            info: "error",
            duration: 9000,
          });
          router.push("/");
        }
      }
      window.addEventListener("resize", handleOrientationChange);
      handleOrientationChange();
      return () => {
        window.removeEventListener("resize", handleOrientationChange);
      };
    }
    if (process.env.NODE_ENV === "production") {
      console.log("In production mode...");
      hotjar.initialize(3300873, 6);
    } else {
      console.log("In development mode...");
    }
  }, []);
  return (
    <ChakraProvider>
      <Head>
        {/* <script
          src="//code.tidio.co/brouaqx7lo1cdavlobag05zmz3pgoebo.js"
          async
        ></script> */}
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
