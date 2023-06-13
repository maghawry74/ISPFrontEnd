import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGovernarate } from '../models/igovernarate';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class GovernorateService extends GenericService<IGovernarate, number> {
  constructor(httpClient: HttpClient) {
    super('Governarate', httpClient);
  }
}
