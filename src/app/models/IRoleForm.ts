export interface IRoleFrom {
  [key: string]: any;
  roleName: string | null;
  admin: boolean | null;
  search: boolean | null;
  clientRequests: boolean | null;
  addNewClient: boolean | null;
}
