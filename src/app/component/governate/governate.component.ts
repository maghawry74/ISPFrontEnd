import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGovernarate } from '../../models/igovernarate';
import { GovernorateService } from '../../services/governorate.service';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { UserService } from 'src/app/services/user.service';
import { Governorate } from 'src/app/models/Permission';

@Component({
  selector: 'app-governate',
  templateUrl: './governate.component.html',
  styleUrls: ['./governate.component.css'],
})
export class GovernateComponent implements OnInit {
  governateList: IGovernarate[] = [];
  EditPermission = false;
  DeletePermission = false;
  CreatePermission = false;
  isLoading = true;
  isError = false;
  p:number = 1;
  constructor(
    private router:Router,
    private GovernorateService:GovernorateService,
    private AngularMateralService:AngularMateralService,
    public userService: UserService
    ){
        this.EditPermission = userService.CheckPermission(Governorate.Update);
        this.DeletePermission = userService.CheckPermission(Governorate.Delete);
        this.CreatePermission = userService.CheckPermission(Governorate.Create)
    
    }
  ngOnInit(): void {
    this.GovernorateService.GetAll().subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.governateList = data;
      },
      error:(e)=>{
        this.isLoading = false;
        this.isError = true;
      }
    })
  }
  deleteGovernate(code:number)
  {
    this.AngularMateralService.openConfirmDialog("Are you sure you want to delete this governorate?")
    .afterClosed().subscribe(resp=>{
      if(resp)
      {
        this.GovernorateService.Delete(code).subscribe({
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
  goToAddComp() {
    this.router.navigate(['/Governorate/Add']);
  }
  toEditGov(code: number) {
    this.router.navigate(['Governorate/Edit', code]);
  }
}
