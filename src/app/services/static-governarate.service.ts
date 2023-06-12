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
      {code: 12354, name:'Alexandria',status:true},
      {code: 14258, name:' Aswan',status:true},
      {code: 47596, name:'Monufia',status:true},
      {code:93614,name:'Port Said',status:true},
      {code:9871,name:'Faiyum',status:true},
      {code:93624,name:'North Sinai',status:true},
      {code:93634,name:'Qalyubia',status:true},
      {code:93614,name:'Gharbia',status:true},
  ]
  }
  getAll()
  {
    return this.governateList;
  }
  getByCode(code:number)
  {
    return this.governateList.find(g=>g.code==code);
  }
 delete(code:number)
 {
  this.governateList = this.governateList.filter(g=>g.code!==code);
 }
 addNewGovernate(newGov:IGovernarate)
 {
  this.governateList.push(newGov);
 }
 updateGov(gov:IGovernarate)
 {
 
  let newGovList = this.governateList.map((item)=>{
    if(item.code==gov.code)return gov;
    else return item;
  })
  this.governateList = newGovList;
  console.log(this.governateList)
 }
}
