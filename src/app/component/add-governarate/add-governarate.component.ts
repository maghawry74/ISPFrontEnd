import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGovernarate } from '../../models/igovernarate';
import {Ripple,Input,initTE,} from "tw-elements";
import { GovernorateService } from '../../services/governorate.service';
import { AngularMateralService } from '../../services/angular-materal.service';
@Component({
  selector: 'app-add-governarate',
  templateUrl: './add-governarate.component.html',
  styleUrls: ['./add-governarate.component.css']
})
export class AddGovernarateComponent implements OnInit {

  governateForm: FormGroup;
  UpdateOrDelete : boolean;
  currentCode:number=0;
  formTitle:string;
  constructor(private fb: FormBuilder,
    private router:Router,
    private locationService:Location,
    private activateRoute:ActivatedRoute,
    private govService :GovernorateService,
    private angularMaterailaServ:AngularMateralService
    )
  {
    this.UpdateOrDelete = true;
    this.formTitle = "Add New Governorate",
    this.governateForm = fb.group({
      code:['', [Validators.required]],
      name:['',[Validators.required,Validators.maxLength(50)]]
    })
  }
  ngOnInit(): void {
    initTE({ Ripple, Input });
    this.activateRoute.paramMap.subscribe(param=>{
      this.currentCode=Number(param.get('code'));
      if(this.currentCode!=0)
      {
        this.UpdateOrDelete = false;
        this.formTitle = "Update Governorate";
        this.govService.getByCode(this.currentCode).subscribe(gov=>{
          this.governateForm.setValue({
            code:gov.code,
            name:gov.name
          })

        })
      }
      })
  }
  //get name
  get name()
  {
    return  this.governateForm.get('name');
  }
  //get code
  get code()
  {
    return this.governateForm.get('code');
  }
  //backToGovList
  backToGovList(){
    this.locationService.back();
  }
  //add governate
  AddGovernarate()
  {
    let newGov:IGovernarate = this.governateForm.value as IGovernarate;
    newGov.status = true;
    this.govService.addGov(newGov).subscribe(resp=>
      {
        this.router.navigate(['/Governarates']);
        this.angularMaterailaServ.addAndUpdateSuccess("Governarate Added Successfully");
        // this.snackBar.open("Governarate Added Successfully",'',{
        //   duration:3000,
        //   verticalPosition:'top',
        //   horizontalPosition: 'right',
        //   panelClass: ['blue-snackbar'],
        // })
      })
   
  }
  //update governorate
  updateGov(){
    let governarate:IGovernarate = this.governateForm.value as IGovernarate;
    console.log(governarate)
    this.govService.updateGov(governarate.code,governarate).subscribe(resp=>{
      this.router.navigate(['/Governarates']);
      this.angularMaterailaServ.addAndUpdateSuccess("Governarate Updated Successfully")
      // this.snackBar.open("Governarate Updated Successfully",'',{
      //   duration:3000,
      //   verticalPosition:'top',
      //   horizontalPosition: 'right',
      //   panelClass: ['blue-snackbar'],
      // })
    })
  }
}
