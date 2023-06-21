import { IBranch } from './IBranch';
import { ICentralView } from './ICentral';
import { IOfferView, IProvider } from './IOffer';
import { IPackageView } from './IPackage';
import { IGovernarate } from './igovernarate';

export interface IClient {
  ssid: string;
  name: string;
  tel: string;
  governorate: IGovernarate;
  address: string;
  email: string;
  provider?: IProvider;
  package?: IPackageView;
  offer?: IOfferView;
  central?: ICentralView;
  branch?: IBranch;
  packageIp: number;
  routerSerial: string;
  phone: string;
  orderNumber: number;
  portSlot: number;
  slot: number;
  portBlock: number;
  block: number;
  userName: string;
  password: string;
  vci: number;
  vpi: number;
  operationOrderNumber: number;
  operationOrderDate: Date;
  prePaid: number;
  installationFee: number;
  contractFee: number;
}
