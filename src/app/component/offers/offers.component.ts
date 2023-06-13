import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOfferView } from 'src/app/models/IOffer';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  isLoading = false;
  isError = false;

  offers: IOfferView[] = [];
  constructor(
    private OfferService: OfferService,
    private router: Router,
    private ngMaterialService: AngularMateralService
  ) {}
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

  EditOffer(id: number) {
    this.router.navigateByUrl(`/Offers/Edit/${id}`);
  }
  DeleteOffer(id: number) {
    return () => {
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
    };
  }
}
