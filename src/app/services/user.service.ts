import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserView, LoginCredentials, LoginResponse } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService<IUserView, string> {
  IsLogged = false;
  Permissions: string[] = [];
  private token = '';
  constructor(httpClient: HttpClient) {
    super('User', httpClient);
    let tokenString = decodeURIComponent(document.cookie).split('token=')[1];
    if (!tokenString) {
      return;
    }
    const token = JSON.parse(tokenString) as LoginResponse;
    if (token) {
      this.IsLogged = true;
      this.Permissions = token.permissions;
      this.token = token.token;
    }
  }
  GetToken() {
    return this.token;
  }

  CheckPermission(Permission: string) {
    for (let P of this.Permissions) {
      if (P == Permission) {
        return true;
      }
    }
    return false;
  }
  Login(Credentials: LoginCredentials) {
    return this.client.post<LoginResponse>(`${this.Url}/Login`, Credentials);
  }
}
