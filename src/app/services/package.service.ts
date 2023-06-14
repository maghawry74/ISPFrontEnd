import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { IPackageView } from '../models/IPackage';

@Injectable({
  providedIn: 'root'
})
export class PackageService extends GenericService<IPackageView,number>{

  constructor(httpClient:HttpClient) {
    super("Package",httpClient)
   }
}
