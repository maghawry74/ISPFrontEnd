import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGovernarate } from '../../models/igovernarate';
import { GovernorateService } from '../../services/governorate.service';
import { AngularMateralService } from 'src/app/services/angular-materal.service';

@Component({
  selector: 'app-governate',
  templateUrl: './governate.component.html',
  styleUrls: ['./governate.component.css'],
})
export class GovernateComponent implements OnInit {
  governateList: IGovernarate[] = [];
  isLoading = true;
  isError = false;
  constructor(
    private router:Router,
    private GovernorateService:GovernorateService,
    private AngularMateralService:AngularMateralService
    ){}
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
    this.router.navigate(['/Governate/Add']);
  }
  toEditGov(code: number) {
    this.router.navigate(['Governate/Edit', code]);
  }
}
