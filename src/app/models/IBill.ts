import { IUser } from './IUser';
import { IClient } from './IClient';

export interface IBill {
  id: number;
  fromDate: Date;
  toDate: Date;
  amount: number;
  isPaid: boolean;
  paymentDate: Date;
  employee: IUser;
  notes: string;
  client: IClient;
  OntheFly?: boolean;
}
