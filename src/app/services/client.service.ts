import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IClient } from '../models/IClient';
import { HttpClient } from '@angular/common/http';
import { IBill, IBillview } from '../models/IBill';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ClientService extends GenericService<IClient, string> {
  BillURL = '';
  constructor(httpClient: HttpClient) {
    super('client', httpClient);
    this.BillURL = `${environment.APIURL}/bill`;
  }

  GetBills(data: { Ssid: string; Condition: boolean }) {
    return this.client.get<IBill[]>(
      `${this.BillURL}/clientbills?ssid=${data.Ssid}&condition=${data.Condition}`
    );
  }

  GetNextBill(data: { ssid: string; Month: number }) {
    return this.client.get<IBill>(
      `${this.BillURL}/next-month-bill?ssid=${data.ssid}&monthNumber=${data.Month}`
    );
  }

  PayBill(data: { ssid: string; id: number }) {
    return this.client.put(
      `${this.BillURL}/paybill/${data.id}`,
      data,
      this.headersOptions
    );
  }
  notPayBill()
  {
    return this.client.get<IBillview[]>(`${this.BillURL}/NotpaidBill`)
  }
}
