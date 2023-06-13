import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

export abstract class GenericService<T, ID> {
  private Url = '';
  private headersOptions: any;
  constructor(Url: string, private client: HttpClient) {
    this.Url = `${environment.APIURL}/${Url}`;
    this.headersOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  GetAll() {
    return this.client.get<T[]>(this.Url);
  }
  GetById(id: ID) {
    return this.client.get<T>(`${this.Url}/${id}`);
  }
  Add(data: any) {
    return this.client.post(this.Url, data, this.headersOptions);
  }

  Update(id: ID, data: any) {
    return this.client.put(`${this.Url}/${id}`, data, this.headersOptions);
  }

  Delete(id: ID) {
    return this.client.delete(`${this.Url}/${id}`);
  }
}