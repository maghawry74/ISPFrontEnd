import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserView } from 'src/app/models/IUser';
import { User } from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usersList:IUserView[]=[]
  isLoading = true;
  isError = false;
  EditPermission = false;
  DeletePermission = false;
  CreatePermission = false;
  p: number = 1;
  constructor(public userService: UserService,
    private router: Router,
    private AngularMateralService:AngularMateralService
    
    )
  {
    this.EditPermission = userService.CheckPermission(User.Update)
    this.DeletePermission = userService.CheckPermission(User.Delete)
    this.CreatePermission = userService.CheckPermission(User.Create)
  }
  ngOnInit(): void {
    this.userService.GetAll().subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.usersList = data;
      },
      error:(e)=>{
        this.isLoading = false;
        this.isError = true;
      }
    })
  }
  toEditUser(id:string)
  {
    this.router.navigate(['User/Edit',id]);
  }
  deleteUser(id:string)

  {
    this.AngularMateralService.openConfirmDialog("Are you sure you want to delete this User?")
    .afterClosed().subscribe(resp=>{
      if(resp)
      {
        this.userService.Delete(id).subscribe({
          next:(resp)=>{
            this.ngOnInit();
            this.AngularMateralService.addAndUpdateSuccess("! Deleted Successfuly");
            },
          error:(e)=>{
            this.AngularMateralService.addAndUpdateSuccess("An Error Occured. Try Again Later !");
          }  
        });
      }
    })

  }
  goToAddComp()
  {
    this.router.navigate(['User/Add']);
  }
}
