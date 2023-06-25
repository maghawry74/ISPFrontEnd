import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import {
  IUser,
  IUserView,
  LoginCredentials,
  LoginResponse,
} from '../models/IUser';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends GenericService<IUserView, string> {
  IsLogged = false;
  Permissions: string[] = [];
  private token = '';
  Name = '';
  APIURL = '';
  constructor(httpClient: HttpClient, private router: Router,private http:HttpClient) {
    super('User', httpClient);
    let tokenString = decodeURIComponent(document.cookie).split('token=')[1];
    if (!tokenString) {
      return;
    }
    const token = JSON.parse(tokenString) as LoginResponse;
    if (token) {
      console.log(token);
      this.IsLogged = true;
      this.Permissions = token.permissions;
      this.token = token.token;
      this.Name = token.name;
    }
    this.APIURL=environment.APIURL;
  }
  checkExistingUser(email:string)
  {
    return this.http.get<boolean>(`${this.APIURL}/User/CheckEmail/${email}`);
  }
  GetToken() {
    return this.token;
  }
  SetToken(newToken: string) {
    this.token = newToken;
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
  LogOut() {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.IsLogged = false;
    this.Permissions = [];
    this.token = '';

    this.router.navigateByUrl('/Login');
  }
}
