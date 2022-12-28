import Head from "next/head";
import { useRouter } from "next/router";

const SEO = () => {
  const router = useRouter();

  return (
    <Head>
      <meta
        name="description"
        content={
          "Many people struggle with various things such as productivity, funding, finding people, and knowing whether their idea is good or not when creating a startup! Gloppa solves all these issues by creating a startup application which has all the features that help founders create and profit from their startups."
        }
      />
      <meta
        name="keywords"
        content={
          "Fun, Startups, Videogames, Games, Company, Tasks, Todolist, Strategy, Gloppa"
        }
      />
      <title>Gloppa - Creating a successful startup is easier than ever</title>
      <meta
        property="og:title"
        content={"Gloppa - Creating a successful startup is easier than ever"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={
          "Many people struggle with various things such as productivity, funding, finding people, and knowing whether their idea is good or not when creating a startup! Gloppa solves all these issues by creating a startup application which has all the features that help founders create and profit from their startups."
        }
      />
      <meta
        property="og:site_name"
        content={"Gloppa - Creating a successful startup is easier than ever"}
      />
    </Head>
  );
};

export default SEO;
