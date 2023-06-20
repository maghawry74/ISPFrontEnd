import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { IUser, LoginCredentials, LoginResponse } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService<IUser, string> {
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
    console.log(token);
    if (token) {
      this.IsLogged = true;
      this.Permissions = token.permissions;
      this.token = token.token;
    }
  }
  GetToken() {
    return this.token;
  }
  Login(Credentials: LoginCredentials) {
    return this.client.post<LoginResponse>(`${this.Url}/Login`, Credentials);
  }
}
