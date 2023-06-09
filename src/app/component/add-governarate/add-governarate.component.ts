import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGovernarate } from 'src/app/models/igovernarate';
import { StaticGovernarateService } from 'src/app/services/static-governarate.service';
import {Ripple,Input,initTE,} from "tw-elements";
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
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
    private govService:StaticGovernarateService,
    private router:Router,
    private locationService:Location,
    private snackBar:MatSnackBar,
    private activateRoute:ActivatedRoute
    )
  {
    this.UpdateOrDelete = true;
    this.formTitle = "Add New Governorate",
    this.governateForm = fb.group({
      Code:['', [Validators.required]],
      Name:['',[Validators.required,Validators.maxLength(50)]]
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
        let currentGov:IGovernarate;
        currentGov= this.govService.getByCode(this.currentCode) as IGovernarate
        this.governateForm.setValue({
          Code:currentGov.Code,
          Name:currentGov.Name
        })
      }
      })
  }
  //get name
  get name()
  {
    return  this.governateForm.get('Name');
  }
  //get code
  get code()
  {
    return this.governateForm.get('Code');
  }
  //backToGovList
  backToGovList(){
    this.locationService.back();
  }
  //add governate
  AddGovernarate()
  {
    let newGov:IGovernarate = this.governateForm.value as IGovernarate;
    this.govService.addNewGovernate(newGov);
    this.router.navigate(['/Governarates']);
    this.snackBar.open("Governarate Added Successfully",'',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition: 'right',
      panelClass: ['blue-snackbar'],
    })
  }
  //
  updateGov(){
    let governarate:IGovernarate = this.governateForm.value as IGovernarate;
    this.govService.updateGov(governarate);
    this.router.navigate(['/Governarates']);
  }
}
