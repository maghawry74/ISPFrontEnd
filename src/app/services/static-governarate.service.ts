import { Injectable } from '@angular/core';
import { IGovernarate } from '../models/igovernarate';

@Injectable({
  providedIn: 'root'
})
export class StaticGovernarateService {
private governateList :IGovernarate[]=[];
  constructor() 
  {
    this.governateList = [
      {Code: 12354, Name:'Alexandria'},
      {Code: 14258, Name:' Aswan'},
      {Code: 47596, Name:'Monufia'},
      {Code:93614,Name:'Port Said'},
      {Code:9871,Name:'Faiyum'},
      {Code:93624,Name:'North Sinai'},
      {Code:93634,Name:'Qalyubia'},
      {Code:93614,Name:'Gharbia'},
  ]
  }
  getAll()
  {
    return this.governateList;
  }
  getByCode(code:number)
  {
    return this.governateList.find(g=>g.Code==code);
  }
 delete(code:number)
 {
  this.governateList = this.governateList.filter(g=>g.Code!==code);
 }
 addNewGovernate(newGov:IGovernarate)
 {
  this.governateList.push(newGov);
 }
 updateGov(gov:IGovernarate)
 {
 
  let newGovList = this.governateList.map((item)=>{
    if(item.Code==gov.Code)return gov;
    else return item;
  })
  this.governateList = newGovList;
  console.log(this.governateList)
 }
}
