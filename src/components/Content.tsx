import {
  ComputerDesktopIcon,
  HeartIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  ScaleIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { Fragment } from "react";

import { useStore } from "@/libs/store";
import { Organizations } from "@/types/Organizations";

import organizations from "../../public/data/organizations.json";
import Container from "./Container";

const Content = () => {
  const [results, setResults] = useState<Organizations>(organizations);
  const [language, setLanguage] = useStore((state) => [
    state.language,
    state.setLanguage,
  ]);

  const { t } = language;
  const ORGANIZATION_NUMBER = organizations.length;

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    let result;
    if (value === "") {
      result = organizations;
    } else {
      const Fuse = (await import("fuse.js")).default;
      const fuse = new Fuse(organizations, {
        threshold: 0.25,
        keys: [
          {
            name: "name",
            weight: 0.7,
          },
          {
            name: "officialSiteUrl.default",
            weight: 0.3,
          },
        ],
      });
      result = fuse.search(value).map((result) => result.item);
    }
    setResults(result);
  };

  return (
    <main style={{ minWidth: "100%", minHeight: "100svh" }}>
      <Container className="">
        <div className="flex flex-col gap-10 py-10">
          <section>
            <h1 className="mb-2 text-3xl font-extrabold sm:mb-3 lg:text-4xl highlight-text">
              {t.TITLE}
            </h1>
            <p>
              {/* {ORGANIZATION_NUMBER} {t.DESCRIPTION} */}
              {t.DESCRIPTION.replace(/XXXX/g, String(ORGANIZATION_NUMBER))}
            </p>
          </section>
          <section>
            <div className="relative mb-5">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={t.SEARCH}
                onChange={async (e) => {
                  handleInput(e);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {results.length !== 0 ? (
                results.map((result) => {
                  return (
                    <Fragment key={result.name}>
                      <article
                        className={`gap-5 p-6 border border-gray-200 bg-white dark:bg-gray-800 rounded-lg dark:border-gray-700 flex flex-col justify-between ${
                          result.details.isOpen ||
                          result.unofficialShops.length !== 0
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <Image
                            className="w-10 h-10"
                            src={result.logo.url}
                            alt={result.name}
                            width={32}
                            height={32}
                          />
                          {result.details.isOpen ? (
                            <a
                              href={
                                result.officialSiteUrl.ja !== ""
                                  ? result.officialSiteUrl.ja
                                  : result.officialSiteUrl.default
                              }
                              target="_blank"
                              className="hover:underline decoration-slate-900 dark:decoration-slate-200"
                            >
                              <h2 className="text-2xl font-semibold tracking-tight highlight-text">
                                {result.name}
                              </h2>
                            </a>
                          ) : (
                            <h2 className="text-2xl font-semibold tracking-tight opacity-50 cursor-default highlight-text">
                              {result.name}
                            </h2>
                          )}
                          {result.unofficialShops.length !== 0 && (
                            <div>
                              {result.unofficialShops.map((shop) => (
                                <a
                                  key={shop.url}
                                  href={shop.url}
                                  target="_blank"
                                  className="text-xs inline-flex pr-2.5 items-center text-blue-600 hover:underline"
                                >
                                  <LinkIcon className="w-3 h-3 mr-1" />
                                  {shop.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 font-normal text-gray-500 cursor-default dark:text-gray-400">
                          {result.details.isOpen ||
                          result.unofficialShops.length !== 0 ? (
                            <>
                              {result.details.isOpenSource && (
                                <span className="text-green-700 border border-gray-200 dark:border-gray-700 badge-with-icon dark:text-green-300">
                                  <ScaleIcon className="w-3 h-3 mr-1" />
                                  {t.ORGANIZATION.OPENSOURCE}
                                </span>
                              )}
                              {result.details.sales.donation && (
                                <span className="text-pink-700 border border-gray-200 dark:border-gray-700 badge-with-icon dark:text-pink-300">
                                  <HeartIcon className="w-3 h-3 mr-1" />
                                  {t.ORGANIZATION.DONATE}
                                </span>
                              )}
                              {result.details.sales.purchase && (
                                <span className="text-gray-700 border border-gray-200 dark:border-gray-700 badge-with-icon dark:text-gray-300">
                                  <ShoppingCartIcon className="w-3 h-3 mr-1" />
                                  {t.ORGANIZATION.PURCHASE}
                                </span>
                              )}
                              {result.details.availability.online && (
                                <span className="text-gray-700 border border-gray-200 dark:border-gray-700 badge-with-icon dark:text-gray-300">
                                  <ComputerDesktopIcon className="w-3 h-3 mr-1" />
                                  {t.ORGANIZATION.ONLINE}
                                </span>
                              )}
                              {result.details.availability.physical && (
                                <span className="text-gray-700 border border-gray-200 dark:border-gray-700 badge-with-icon dark:text-gray-300">
                                  <UserIcon className="w-3 h-3 mr-1" />
                                  {t.ORGANIZATION.PHYSICAL}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-700 border border-gray-200 dark:border-gray-700 badge-with-icon dark:text-gray-300">
                              <XMarkIcon className="w-3 h-3 mr-1" />
                              {t.ORGANIZATION.NOTOPEN}
                            </span>
                          )}
                        </div>
                      </article>
                    </Fragment>
                  );
                })
              ) : (
                <p>Not Found.</p>
              )}
            </div>
          </section>
          <section>
            <ul className="list-disc">
              {results.map((result) => {
                if (result.logo.license !== "") {
                  return (
                    <li key={result.name}>
                      {result.name}:{" "}
                      <a href={result.logo.licenseUrl} target="_blank">
                        {result.logo.license}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default Content;
