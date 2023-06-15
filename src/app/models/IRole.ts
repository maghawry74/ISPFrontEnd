export interface IRole {
  id: string;
  name: string;
  claims: IRoleClaim[];
}

export interface IRoleClaim {
  [type: string]: string;
  value: string;
}
