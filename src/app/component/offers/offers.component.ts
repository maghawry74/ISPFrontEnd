import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOfferView } from 'src/app/models/IOffer';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { APIService } from 'src/app/services/api.service';

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
    private APIService: APIService,
    private router: Router,
    private ngMaterialService: AngularMateralService
  ) {}
  ngOnInit(): void {
    this.APIService.GetAll<IOfferView>('Offer').subscribe({
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
      this.APIService.Delete('Offer', id).subscribe({
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
