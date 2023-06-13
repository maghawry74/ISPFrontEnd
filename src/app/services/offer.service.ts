import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IOfferView } from '../models/IOffer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OfferService extends GenericService<IOfferView, number> {
  constructor(client: HttpClient) {
    super('offer', client);
  }
}
