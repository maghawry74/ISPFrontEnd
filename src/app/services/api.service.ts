import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private Url = '';
  constructor(private client: HttpClient) {
    this.Url = `${environment.APIURL}`;
  }

  GetAll<T>(path: string) {
    return this.client.get<T[]>(`${this.Url}/${path}`);
  }
  GetById<T>(path: string, id: number) {
    console.log(id, 'From ApiService');
    return this.client.get<T>(`${this.Url}/${path}/${id}`);
  }
  Add(path: string, data: any) {
    return this.client.post(`${this.Url}/${path}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  Update(path: string, data: any) {
    return this.client.put(`${this.Url}/${path}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  Delete(path: string, id: any) {
    return this.client.delete(`${this.Url}/${path}/${id}`);
  }
}
