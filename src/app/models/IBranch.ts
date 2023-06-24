import { IGovernarate } from './igovernarate';

export interface IBranch {
  id: number;
  name: string;
  tel1: string;
  tel2: string;
  phone1: string;
  phone2: string;
  fax: string;
  governorate?: IGovernarate;
  managerName: string;
}
export interface IBranchInUser
{
  id:number,
  name:string
}
