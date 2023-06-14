import { IGovernarate } from './igovernarate';
export interface ICentralView {
  id: number;
  name: string;
  governorate: IGovernarate;
}

export interface ICentralAdd {
  governorateCode: string;
  name: string;
}

export interface ICentralUpdate {
  id: number;
  governorateCode: string;
  name: string;
}
