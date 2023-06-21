import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IProvider } from '../models/IOffer';
import { HttpClient } from '@angular/common/http';
import { IproviderOffersAndPackages } from '../models/iprovider';

@Injectable({
  providedIn: 'root',
})
export class ProviderService extends GenericService<IProvider, number> {
  constructor(client: HttpClient) {
    super('Provider', client);
  }

  GetProviderOffersAndPackages(id: number) {
    return this.client.get<IproviderOffersAndPackages>(
      `${this.Url}/${id}/Offers&Packages`
    );
  }
}
