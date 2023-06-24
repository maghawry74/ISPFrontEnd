import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Info } from '../models/Info';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  API_URL = '';
  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.APIURL;
  }

  GetInfo() {
    return this.httpClient.get<Info>(`${this.API_URL}/shared`);
  }
}
