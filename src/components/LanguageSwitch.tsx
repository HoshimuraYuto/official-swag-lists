import { Menu, Transition } from "@headlessui/react";
import { LanguageIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Fragment, useEffect } from "react";

import { useStore } from "@/libs/store";

const LanguageSwitch = () => {
  const [language, setLanguage] = useStore((state) => [
    state.language,
    state.setLanguage,
  ]);

  const { t } = language;

  useEffect(() => {
    console.log(language);
  }, [language]);

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="header-button">
          <LanguageIcon className="w-6 h-6" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active
                        ? "header-button-menu-active"
                        : "header-button-menu"
                    } group flex items-center w-full px-2 py-2 text-md rounded-md`}
                    href="/en"
                    onClick={() => {
                      setLanguage("en");
                    }}
                  >
                    {t.LANGUAGES.ENGLISH}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active
                        ? "header-button-menu-active"
                        : "header-button-menu"
                    } group flex items-center w-full px-2 py-2 text-md rounded-md`}
                    href="/ja"
                    onClick={() => {
                      setLanguage("ja");
                    }}
                  >
                    {t.LANGUAGES.JAPANESE}
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default LanguageSwitch;
