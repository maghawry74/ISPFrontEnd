import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Ripple,Input,initTE,} from "tw-elements";
import {  ProviderService } from 'src/app/services/provider.service';
import { Location } from '@angular/common';
import { Iprovider } from 'src/app/models/iprovider';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {
  providerForm;
  UpdateOrDelete : boolean;
  currentCode:number=0;
  formTitle:string;

  constructor(private fb:FormBuilder,
    private activateRoute:ActivatedRoute,
    private ProviderService:ProviderService,
    private location:Location,
    private router:Router,
    private angularMaterailaServ:AngularMateralService
    )
  {
    this.UpdateOrDelete = true;
    this.formTitle = "Add New Provider",
    this.providerForm = fb.group({
      name:['',[Validators.required,Validators.maxLength(50)]]
    })
  }
  ngOnInit(): void {
    initTE({ Ripple, Input });
    this.activateRoute.paramMap.subscribe(param=>{
      this.currentCode = Number(param.get('id'));
      if(this.currentCode!=0)
      {
        this.UpdateOrDelete = false;
        this.formTitle = "Update Provider";
        this.ProviderService.getProvById(this.currentCode).subscribe(prov=>{
          this.providerForm.setValue({
            name:prov.name
          }) })
      }
    })
  }
//get name
get name()
{
return  this.providerForm.get('name');
}
//backToProvidersList
backToProvList()
{
  this.location.back();
}
//add provider
addProvider()
{
  let newProv:Iprovider = this.providerForm.value as Iprovider
  this.ProviderService.addProvider(newProv).subscribe(resp=>{
       this.router.navigate(['/Providers']);
       this.angularMaterailaServ.addAndUpdateSuccess("Provider Added Successfully");
  })
}
 //update Provider
 updateProv()
 {
  let newProv:Iprovider = this.providerForm.value as Iprovider
  this.ProviderService.updateProvider(this.currentCode,newProv).subscribe(resp=>{
    this.router.navigate(['/Providers']);
    this.angularMaterailaServ.addAndUpdateSuccess("provider Updated Successfully")
  })
 }
}