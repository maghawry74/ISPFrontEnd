import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../models/IRole';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends GenericService<IRole, string> {
  constructor(Client: HttpClient) {
    super('role', Client);
  }
}
