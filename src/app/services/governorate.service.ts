import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGovernarate } from '../models/igovernarate';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class GovernorateService extends GenericService<IGovernarate, number> {
  constructor(httpClient: HttpClient) {
    super('Governarate', httpClient);
  }
}
