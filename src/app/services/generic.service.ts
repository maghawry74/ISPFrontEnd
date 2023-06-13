import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

export abstract class GenericService<T, ID> {
  private Url = '';
  constructor(Url: string, private client: HttpClient) {
    this.Url = `${environment.APIURL}/${Url}`;
  }

  GetAll() {
    return this.client.get<T[]>(this.Url);
  }
  GetById(id: ID) {
    return this.client.get<T>(`${this.Url}/${id}`);
  }
  Add(data: any) {
    return this.client.post(this.Url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  Update(data: any) {
    return this.client.put(this.Url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  Delete(id: ID) {
    return this.client.delete(`${this.Url}/${id}`);
  }
}
