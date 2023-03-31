import { useRouter } from "next/router";
import { useEffect } from "react";

import Loading from "@/components/Loading";
import { useStore } from "@/libs/store";

const Index = () => {
  const [setDetermined, setLanguage] = useStore((state) => [
    state.setDetermined,
    state.setLanguage,
  ]);

  const router = useRouter();

  useEffect(() => {
    const browser_language = window.navigator.language;
    const language = browser_language.includes("ja") ? "ja" : "en";
    setLanguage(language);
    router.replace(`/${language}`);
    setDetermined();
  }, []);

  return <Loading />;
};

export default Index;
