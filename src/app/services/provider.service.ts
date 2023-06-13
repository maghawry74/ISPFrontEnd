import { Iprovider } from '../models/iprovider';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
httpOption;
  constructor(private HttpClient:HttpClient) 
  {
    this.httpOption = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
     })
    }

   }
  getAllProviders():Observable<Iprovider[]>
  {
    return this.HttpClient.get<Iprovider[]>(`${environment.APIURL}/Provider`);
  }
  getProvById(id:number):Observable<Iprovider>
  {
    return this.HttpClient.get<Iprovider>(`${environment.APIURL}/Provider/${id}`);
  }
  addProvider(newProv:Iprovider):Observable<Iprovider>
  {
    return this.HttpClient.post<Iprovider>(`${environment.APIURL}/Provider`, JSON.stringify(newProv),this.httpOption);
  }
  updateProvider(id:number,newProv:Iprovider)
  {
   return this.HttpClient.put('${environment.APIURL}/Provider/${id}',JSON.stringify(newProv),this.httpOption);
  }
  deleteProvider(id:number)
  {
   return this.HttpClient.delete(`${environment.APIURL}/Provider/${id}`);
  }

}
