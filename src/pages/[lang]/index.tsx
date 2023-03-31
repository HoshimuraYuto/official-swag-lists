import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useStore } from "@/libs/store";

export const getStaticPaths = async () => {
  return {
    paths: [{ params: { lang: "en" } }, { params: { lang: "ja" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const lang = params?.lang ?? "en";

  return {
    props: {
      lang,
    },
  };
};

const Home = () => {
  const [language, setDetermined, setLanguage] = useStore((state) => [
    state.language,
    state.setDetermined,
    state.setLanguage,
  ]);

  const { determined, t } = language;

  const router = useRouter();
  const { lang } = router.query;

  useEffect(() => {
    if (determined) {
      return;
    }

    if (lang !== undefined) {
      if (!lang.includes(language.locale)) {
        setLanguage(lang.includes("ja") ? "ja" : "en");
        router.replace(`/${lang === "ja" ? "ja" : "en"}`);
      }
      setDetermined();
    }
  }, [lang]);

  return (
    <>
      {determined ? (
        <>
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            ></meta>
            <title>{t.TITLE}</title>
            <meta name="description" content={language.t.LONG_DESCRIPTION} />
            <meta
              httpEquiv="Content-Language"
              content={language.t.LOCALE_SHORT}
            />
            <link
              rel="canonical"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/${language.t.LOCALE_SHORT}`}
            />
            <link
              rel="alternate"
              hrefLang="ja"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/ja`}
            />
            <link
              rel="alternate"
              hrefLang="en"
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/en`}
            />
            <meta
              property="og:url"
              content={`${process.env.NEXT_PUBLIC_SITE_URL}/${language.t.LOCALE_SHORT}`}
            />
            <meta property="og:title" content={language.t.TITLE} />
            <meta
              property="og:description"
              content={language.t.LONG_DESCRIPTION}
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`}
            />
            <meta property="og:site_name" content={language.t.TITLE} />
            <meta property="og:locale" content={`${language.t.LOCALE_SHORT}`} />
            <meta
              name="twitter:url"
              content={`${process.env.NEXT_PUBLIC_SITE_URL}/${language.t.LOCALE_SHORT}`}
            />
            <meta name="twitter:site" content="@HoshimuraYuto" />
            <meta name="twitter:creator" content="@HoshimuraYuto" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={language.t.TITLE} />
            <meta
              name="twitter:description"
              content={language.t.LONG_DESCRIPTION}
            />
            <meta
              name="twitter:image"
              content={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`}
            />
          </Head>
          <Header />
          <Content />
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
