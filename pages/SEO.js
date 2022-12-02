import Head from "next/head";
import { useRouter } from "next/router";

const SEO = () => {
  const router = useRouter();

  return (
    <Head>
      <meta
        name="description"
        content={"Launching a startup is like playing a video game at Gloppa!"}
      />
      <meta
        name="keywords"
        content={
          "Fun, Startups, Videogames, Games, Company, Tasks, Todolist, Strategy"
        }
      />
      <title>Gloppa - Startups are now like videogames</title>
      <meta
        property="og:title"
        content={"Gloppa - Startups are now like videogames"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={"Launching a startup is like playing a video game at Gloppa!"}
      />
      <meta
        property="og:site_name"
        content={"Gloppa - Startups are now like videogames"}
      />
    </Head>
  );
};

export default SEO;
