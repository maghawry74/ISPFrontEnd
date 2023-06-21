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
