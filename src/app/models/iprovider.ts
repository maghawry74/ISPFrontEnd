export interface Iprovider {
  id: number;
  name: string;
  status?: boolean;
}
export interface IproviderOffersAndPackages {
  offers: IProviderOffer[];
  packages: IProviderPackage[];
}

export interface IProviderOffer {
  name: string;
  id: number;
}

export interface IProviderPackage {
  name: string;
  id: number;
}
