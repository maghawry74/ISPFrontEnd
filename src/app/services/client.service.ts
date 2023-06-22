import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IClient } from '../models/IClient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBill } from '../models/IBill';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends GenericService<IClient, string> {
  constructor(httpClient: HttpClient) {
    super('client', httpClient);
  }

  GetBills(data: { Ssid: string; Condition: boolean }) {
    return this.client.get<IBill[]>(
      `${this.Url}/bill?ssid=${data.Ssid}&condition=${data.Condition}`
    );
  }

  GetNextBill(data: { ssid: string; Month: number }) {
    return this.client.get<IBill>(
      `${this.Url}/nextBill?ssid=${data.ssid}&monthNumber=${data.Month}`
    );
  }

  PayBill(data: { ssid: string; id: number }) {
    return this.client.patch(`${this.Url}/bill`, data, this.headersOptions);
  }
}
