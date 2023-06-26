export interface IOfferView {
  id: number;
  name: string;
  discount: number;
  isPercent: boolean;
  isTotalBill: boolean;
  cancelFee: number;
  numberOfMonths: number;
  freeMonthsFirst: boolean;
  numberOfFreeMonths: number;
  freeRouter: boolean;
  routerPrice: number;
  provider: IProvider;
}
export interface IOfferAddOrUpdate {
  id?: number;
  name: string;
  discount: number;
  isPercent: boolean;
  cancelFee: number;
  numberOfMonths: number;
  freeMonthsFirst: boolean;
  numberOfFreeMonths: number;
  freeRouter: boolean;
  routerPrice: number;
  providerId: number;
  isTotalBill: boolean;
}

export interface IProvider {
  id: number;
  name: string;
  statue: boolean;
}
