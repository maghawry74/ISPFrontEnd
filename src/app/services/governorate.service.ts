import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IGovernarate,
  IGovernarateCentralsAndBranches,
} from '../models/igovernarate';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class GovernorateService extends GenericService<IGovernarate, number> {
  constructor(httpClient: HttpClient) {
    super('Governorate', httpClient);
  }

  GetGovernorateBranchesAndCentrals(code: string) {
    return this.client.get<IGovernarateCentralsAndBranches>(
      `${this.Url}/${code}/Centrals&Branches`
    );
  }
}
