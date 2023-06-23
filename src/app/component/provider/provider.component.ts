import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from 'src/app/models/Permission';
import { Iprovider } from 'src/app/models/iprovider';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { ProviderService } from 'src/app/services/provider.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
providersList:Iprovider[]=[];
isLoading = true;
isError = false;
EditPermission = false;
DeletePermission = false;
CreatePermission = false;
constructor(private providerService:ProviderService, 
  private router:Router,
  private AngularMateralService:AngularMateralService,
  public userService: UserService
  )
{
        this.EditPermission = userService.CheckPermission(Provider.Update);
        this.DeletePermission = userService.CheckPermission(Provider.Delete);
        this.CreatePermission = userService.CheckPermission(Provider.Create)
}
  ngOnInit(): void {
    this.providerService.GetAll().subscribe({
      next:(data)=>{
        this.isLoading = false;
        this.providersList = data;
      },
      error:(e)=>{
        this.isLoading = false;
        this.isError = true;
      }
    })
  }
  deleteProvider(id:number)
  {
    this.AngularMateralService.openConfirmDialog("Are you sure you want to delete this provider?")
    .afterClosed().subscribe(resp=>{
      if(resp)
      {
        this.providerService.Delete(id).subscribe({
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
    this.router.navigate(['/Provider/Add'])
  }
  toEditProv(id:number)
  {
    this.router.navigate(['Provider/Edit',id]);
  }
}
