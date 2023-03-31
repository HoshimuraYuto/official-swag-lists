export type unofficialShops = {
  name: string;
  url: string;
}[];

export type Organization = {
  name: string;
  officialSiteUrl: {
    default: string;
    ja: string;
  };
  logo: {
    url: string;
    license: string;
    licenseUrl: string;
  };
  details: {
    isOpen: boolean;
    isOpenSource: boolean;
    sales: {
      donation: boolean;
      purchase: boolean;
    };
    availability: {
      online: boolean;
      physical: boolean;
    };
  };
  unofficialShops: unofficialShops;
};

export type Organizations = Organization[];
