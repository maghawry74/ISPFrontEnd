import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGovernarate } from '../models/igovernarate';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {
  httpOption;
  constructor(private httpClient: HttpClient) 
  { 
    this.httpOption = {
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
  }
  getAll(): Observable<IGovernarate[]>
  {
    return this.httpClient.get<IGovernarate[]>(`${environment.APIURL}/Governarate`)
  }
  getByCode(code:number):Observable<IGovernarate>
  {
    return this.httpClient.get<IGovernarate>(`${environment.APIURL}/Governarate/${code}`)
  }
  addGov(newGov:IGovernarate):Observable<IGovernarate>
  {
    return this.httpClient.post<IGovernarate>(`${environment.APIURL}/Governarate`, JSON.stringify(newGov),this.httpOption);
  }
  updateGov(code:number,newGov:any)
  {
    return this.httpClient.put(`${environment.APIURL}/Governarate/${code}`,JSON.stringify(newGov),this.httpOption);
  }
  deleteGov(code:number)
  {
   return this.httpClient.delete(`${environment.APIURL}/Governarate/${code}`);
  }
}
