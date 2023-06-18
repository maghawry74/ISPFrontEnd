import { Central } from './Permission';

export interface IRoleFrom {
  [key: string]: any;
  roleName: string | null;
  [Central.Create]: boolean | null;
  [Central.Delete]: boolean | null;
  [Central.Read]: boolean | null;
  [Central.Update]: boolean | null;
}
