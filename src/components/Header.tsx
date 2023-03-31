import Link from "next/link";

import { useStore } from "@/libs/store";

import Container from "./Container";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  const [language] = useStore((state) => [state.language]);

  const { locale, t } = language;

  return (
    <header className="border-b border-gray-200 dark:border-slate-300/10">
      <Container className="">
        <div className="py-2.5">
          <nav className="flex flex-wrap items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center">
              <p className="self-center text-xl font-semibold whitespace-nowrap highlight-text">
                {t.TITLE}
              </p>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitch />
              <ThemeSwitch />
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
