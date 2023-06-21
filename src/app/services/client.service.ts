import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IClient } from '../models/IClient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends GenericService<IClient, string> {
  constructor(httpClient: HttpClient) {
    super('client', httpClient);
  }
}
