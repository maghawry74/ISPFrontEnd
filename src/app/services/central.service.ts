import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { ICentralAdd, ICentralUpdate, ICentralView } from '../models/ICentral';
@Injectable({
  providedIn: 'root',
})
export class CentralService {
  private Url = '';
  constructor(private client: HttpClient) {
    this.Url = `${environment.APIURL}/central`;
  }

  GetAllCentrals() {
    return this.client.get<ICentralView[]>(this.Url);
  }
  GetCentralById(id: number) {
    return this.client.get<ICentralView>(`${this.Url}/${id}`);
  }
  AddCentral(central: ICentralAdd) {
    return this.client.post(this.Url, central, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  UpdateCentral(central: ICentralUpdate) {
    return this.client.put(this.Url, central, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  DeleteCentral(id: number) {
    return this.client.delete(`${this.Url}/${id}`);
  }
}
