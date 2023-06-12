export interface IOffer {
  Id: Number;
  Name: string;
  Discount: Number;
  IsPercent: boolean;
  CancelFee: Number;
  NumberOfMonths: Number;
  FreeMonthsFirst: Number;
  NumberOfFreeMonths: Number;
  FreeRouter: Boolean;
  RouterPrice: Number;
  Provider: IProvider;
}

interface IProvider {
  Id: Number;
  Name: string;
  Statue: boolean;
}
