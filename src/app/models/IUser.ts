import { IBranch } from "./IBranch";
import { IRole } from "./IRole";

export interface IUser {
  id: string;
  name: string;
  branchName: string;
  phoneNumber: string;
  role: string;
  userName: string;
  email: string;
}

export interface LoginCredentials {
  UserName: string;
  Password: string;
}
export interface LoginResponse {
  token: string;
  permissions: string[];
  expireDate: Date;
}
export interface IUserView{
  id: string;
  userName:string;
  email:string;
  phoneNumber:string;
  branch:IBranch;
  role:IRole;
  status:boolean
}
