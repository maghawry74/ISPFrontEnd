import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ICentralView } from '../models/ICentral';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CentralService extends GenericService<ICentralView, number> {
  constructor(client: HttpClient) {
    super('Central', client);
  }
  
}
