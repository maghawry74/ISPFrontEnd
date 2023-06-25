import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOfferView } from 'src/app/models/IOffer';
import { Offer } from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { OfferService } from 'src/app/services/offer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  isLoading = false;
  isError = false;
  EditPermission = false;
  DeletePermission = false;
  CreatePermission = false;
  offers: IOfferView[] = [];
  p:number = 1;
  constructor(
    private OfferService: OfferService,
    private router: Router,
    private ngMaterialService: AngularMateralService,
    public userService: UserService
  ) {
    this.EditPermission = userService.CheckPermission(Offer.Update);
    this.DeletePermission = userService.CheckPermission(Offer.Delete);
    this.CreatePermission = userService.CheckPermission(Offer.Create);
  }
  ngOnInit(): void {
    this.OfferService.GetAll().subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        this.offers = data;
      },
      error: (e) => {
        this.isError = true;
        this.isLoading = false;
        console.log(e);
      },
    });
  }

  DeleteOffer(id: number) {
    this.ngMaterialService.openConfirmDialog("Are you sure you want to delete this Offer?")
    .afterClosed()
    .subscribe(resp=>
      {
        if(resp)
        {
          this.OfferService.Delete(id).subscribe({
            next: () => {
              this.ngMaterialService.addAndUpdateSuccess(
                'Offer Has Been Deleted Successfully'
              );
              this.offers = this.offers.filter((o) => o.id != id);
            },
            error: (e) => {
              this.ngMaterialService.addAndUpdateSuccess(
                'An Error Occured. Try Again Later!'
              );
              console.log(e);
            },
          });
        }
      })
     
  }
}
