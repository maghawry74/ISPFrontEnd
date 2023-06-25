import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBranch } from 'src/app/models/IBranch';
import { IRole } from 'src/app/models/IRole';
import { BranchService } from 'src/app/services/branch.service';
import { RoleService } from 'src/app/services/role.service';
import { Ripple, Input, initTE, Select } from 'tw-elements';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { checkEmailValidation } from 'src/app/Validation/emailValidation';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm;
  UpdateOrDelete: boolean;
  currentId: string='';
  formTitle: string;
  roleList:IRole[] = [];
  branchList:IBranch[]=[]
  constructor(private fb:FormBuilder,
              private branchService:BranchService,
              private roleService:RoleService,
              private ActivatedRoute:ActivatedRoute,
              private userService:UserService,
              private Location:Location,
              private angularMaterailaServ:AngularMateralService,
              private router:Router
  
    )
  {
    this.UpdateOrDelete = true;
    this.formTitle = 'Add New Employee',
    this.userForm = fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.pattern(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)],[checkEmailValidation(this.userService)]],
      phoneNumber:['',[Validators.required]],
      roleId:['',[Validators.required]],
      branchId:['',[Validators.required]],
    });
    //get all roles
    this.roleService.GetAll().subscribe(data=>{
      this.roleList = data
    });
    //get all branches
    this.branchService.GetAll().subscribe(data=>{
      this.branchList = data
    });
  }
  ngOnInit(): void {
    initTE({ Ripple, Input, Select });
    this.ActivatedRoute.paramMap.subscribe(resp=>{
      this.currentId = resp.get('id') as string;
      if(this.currentId.length>0)
      {
        this.UpdateOrDelete = false;
        this.formTitle = 'Update Employee';
        this.userService.GetById(this.currentId).subscribe(user=>{
          this.userForm.patchValue({
           userName:user.userName,
           password:"gehad123",
           email:user.email,
           phoneNumber:user.phoneNumber,
           branchId:user.branch.id.toString(),
           roleId:user.role.id,
          })
        })
        
      }
    });
  }
  get userName()
  {
    return this.userForm.get('userName');
  }
  get password(){
    return this.userForm.get('password');
  }
  get email()
  {
   return this.userForm.get('email');
  }
  get phoneNumber()
  {
    return this.userForm.get('phoneNumber');
  }
  get roleId()
  {
    return this.userForm.get('roleId');
  }
  get branchId()
  {
    return this.userForm.get('branchId');
  }
  backToPackList() {
    this.Location.back();
  }
  addUser()
  {
    let newUser = this.userForm.value;
    console.log(newUser);
    this.userService.Add(newUser).subscribe({
      next:resp=>{
        this.router.navigate(['/Users']);
        this.angularMaterailaServ.addAndUpdateSuccess("Employee Added Successfully")
      },
      error:e=>{
        console.log(e);
        this.angularMaterailaServ.addAndUpdateSuccess("An Error Occured Try Again Later")
      }
    })
  }
  updateUser()
  {

    const updateUser={
      id:this.currentId,
      userName:this.userName?.value,
      email:this.email?.value,
      phoneNumber:this.phoneNumber?.value,
      branch:this.branchId?.value,
      role:this.roleId?.value,
      status:true
    }
    this.userService.Update(this.currentId, updateUser).subscribe({
      next: (resp) => {
        this.router.navigate(['/Users']);
        this.angularMaterailaServ.addAndUpdateSuccess(
          'Employee Updated Successfully'
        );
      },
      error: (e) => {
        this.angularMaterailaServ.addAndUpdateSuccess(
          "'An Error Occured Try Again Later'"
        );
      },
    });
  }
}
