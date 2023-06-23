import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { IBranch } from '../models/IBranch';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends GenericService<IBranch, number> {
  constructor(client: HttpClient) {
    super('Branch', client);
  }
}
