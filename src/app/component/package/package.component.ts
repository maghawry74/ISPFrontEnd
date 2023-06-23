import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IPackageView } from 'src/app/models/IPackage';
import { Package } from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { PackageService } from 'src/app/services/package.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit{
  packageList:IPackageView[]=[];
  isLoading = true;
  isError = false;
  EditPermission = false;
  DeletePermission = false;
  CreatePermission = false;
  p: number = 1;
  constructor(private packageService:PackageService,
               private router:Router,
               private AngularMateralService:AngularMateralService,
               public userService: UserService

    ){
      this.EditPermission = userService.CheckPermission(Package.Update);
      this.DeletePermission = userService.CheckPermission(Package.Delete);
      this.CreatePermission = userService.CheckPermission(Package.Create)
    }
  ngOnInit(): void {

    this.packageService.GetAll().subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.packageList = data;
      },
      error:(e)=>{
        this.isLoading = false;
        this.isError = true;
      }
    })
  }
 toEditPackage(id:number)
  {
    this.router.navigate(['Package/Edit',id]);
  }
  //delete package
  deletePackage(id:number)
  {
    this.AngularMateralService.openConfirmDialog("Are you sure you want to delete this Package?")
    .afterClosed().subscribe(resp=>{
      if(resp)
      {
        this.packageService.Delete(id).subscribe({
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
    this.router.navigate(['Package/Add']);
  }
}
