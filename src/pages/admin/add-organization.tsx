import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import type { FormEvent } from "react";
import { useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Organization } from "@/types/Organizations";

const defaultOrganization = {
  name: "",
  officialSiteUrl: {
    default: "https://",
    ja: "",
  },
  logo: {
    url: "https://cdn.simpleicons.org/",
    license: "",
    licenseUrl: "",
  },
  details: {
    isOpen: true,
    isOpenSource: true,
    sales: {
      donation: false,
      purchase: true,
    },
    availability: {
      online: true,
      physical: false,
    },
  },
  unofficialShops: [],
};

export const getStaticProps = () => {
  return {
    props: {},
    notFound: process.env.NODE_ENV === "production",
  };
};

const AddOrganization = () => {
  const [organization, setOrganization] =
    useState<Organization>(defaultOrganization);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/update-organizations", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        data: organization,
      }),
    });
    const status = response.status;
    if (status === 200) {
      setOrganization(defaultOrganization);
    }
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main style={{ minWidth: "100%", minHeight: "100svh" }}>
        <section>
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Add a new organization
            </h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="w-full">
                  <label
                    htmlFor="name-en"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name-en"
                    id="name-en"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Organization name (en)"
                    required
                    value={organization.name}
                    onChange={(e) => {
                      setOrganization({
                        ...organization,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    url
                  </label>
                  <input
                    name="url"
                    id="url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="https://"
                    required
                    value={organization.officialSiteUrl.default}
                    onChange={(e) => {
                      setOrganization({
                        ...organization,
                        officialSiteUrl: {
                          ...organization.officialSiteUrl,
                          default: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="url-ja"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    url(ja)
                  </label>
                  <input
                    name="url-ja"
                    id="url-ja"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="https://"
                    value={organization.officialSiteUrl.ja}
                    onChange={(e) => {
                      setOrganization({
                        ...organization,
                        officialSiteUrl: {
                          ...organization.officialSiteUrl,
                          ja: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="logo-url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Logo url
                  </label>
                  <input
                    name="logo-url"
                    id="logo-url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="https://"
                    required
                    value={organization.logo.url}
                    onChange={(e) => {
                      setOrganization({
                        ...organization,
                        logo: {
                          ...organization.logo,
                          url: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="logo-url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Logo License
                  </label>
                  <input
                    type="text"
                    name="logo-url"
                    id="logo-url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=""
                    value={organization.logo.license}
                    onChange={(e) => {
                      setOrganization({
                        ...organization,
                        logo: {
                          ...organization.logo,
                          license: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="logo-url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Logo License url
                  </label>
                  <input
                    type="url"
                    name="logo-url"
                    id="logo-url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="https://"
                    value={organization.logo.licenseUrl}
                    onChange={(e) => {
                      setOrganization({
                        ...organization,
                        logo: {
                          ...organization.logo,
                          licenseUrl: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="info"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Info
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center mr-4">
                      <input
                        id="is-open"
                        type="checkbox"
                        name="info"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={organization.details.isOpen}
                        onChange={() => {
                          setOrganization({
                            ...organization,
                            details: {
                              ...organization.details,
                              isOpen: !organization.details.isOpen,
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor="is-open"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        shop is open
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="is-open-sorce"
                        type="checkbox"
                        name="info"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={organization.details.isOpenSource}
                        onChange={() => {
                          setOrganization({
                            ...organization,
                            details: {
                              ...organization.details,
                              isOpenSource: !organization.details.isOpenSource,
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor="is-open-sorce"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        organization is opensource
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="sales-info"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sales info
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center mr-4">
                      <input
                        id="donation"
                        type="checkbox"
                        name="sales-info"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={organization.details.sales.donation}
                        onChange={() => {
                          setOrganization({
                            ...organization,
                            details: {
                              ...organization.details,
                              sales: {
                                ...organization.details.sales,
                                donation: !organization.details.sales.donation,
                              },
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor="donation"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        donation
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="purchase"
                        type="checkbox"
                        name="sales-info"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={organization.details.sales.purchase}
                        onChange={() => {
                          setOrganization({
                            ...organization,
                            details: {
                              ...organization.details,
                              sales: {
                                ...organization.details.sales,
                                purchase: !organization.details.sales.purchase,
                              },
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor="purchase"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        purchase
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="availability"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Availability
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center mr-4">
                      <input
                        id="online"
                        type="checkbox"
                        name="availability"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={organization.details.availability.online}
                        onChange={() => {
                          setOrganization({
                            ...organization,
                            details: {
                              ...organization.details,
                              availability: {
                                ...organization.details.availability,
                                online:
                                  !organization.details.availability.online,
                              },
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor="online"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        online
                      </label>
                    </div>
                    <div className="flex items-center mr-4">
                      <input
                        id="physical"
                        type="checkbox"
                        name="physical"
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={organization.details.availability.physical}
                        onChange={() => {
                          setOrganization({
                            ...organization,
                            details: {
                              ...organization.details,
                              availability: {
                                ...organization.details.availability,
                                physical:
                                  !organization.details.availability.physical,
                              },
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor="is-open-sorce"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        physical
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="shops"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Unofficial Shops
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={() => {
                        setOrganization({
                          ...organization,
                          unofficialShops: [
                            ...organization.unofficialShops,
                            {
                              name: "",
                              url: "https://",
                            },
                          ],
                        });
                      }}
                    >
                      <PlusSmallIcon className="w-4 h-4 mr-1 -ml-1" />
                      Add shop
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      onClick={() => {
                        setOrganization({
                          ...organization,
                          unofficialShops: [
                            ...organization.unofficialShops.slice(0, -1),
                          ],
                        });
                      }}
                    >
                      <MinusSmallIcon className="w-4 h-4 mr-1 -ml-1" />
                      Remove shop
                    </button>
                  </div>
                  {organization.unofficialShops.map((shop, index) => (
                    <>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor={`unofficial-shops-name-${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name={`unofficial-shops-name-${index}`}
                          id={`unofficial-shops-name-${index}`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Name"
                          required
                          value={shop.name}
                          onChange={(e) => {
                            const newUnofficialShops = [
                              ...organization.unofficialShops,
                            ];
                            newUnofficialShops[index].name = e.target.value;
                            setOrganization({
                              ...organization,
                              unofficialShops: newUnofficialShops,
                            });
                          }}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor={`unofficial-shops-url-${index}`}
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          url
                        </label>
                        <input
                          type="url"
                          name={`unofficial-shops-url-${index}`}
                          id={`unofficial-shops-url-${index}`}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="https://"
                          required
                          value={shop.url}
                          onChange={(e) => {
                            const newUnofficialShops = [
                              ...organization.unofficialShops,
                            ];
                            newUnofficialShops[index].url = e.target.value;
                            setOrganization({
                              ...organization,
                              unofficialShops: newUnofficialShops,
                            });
                          }}
                        />
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="bg-violet-700 inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Add product
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AddOrganization;
