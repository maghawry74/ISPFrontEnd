import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FreeMonthsValidator } from 'src/app/Validation/FreeMonthsValidator';
import { RouterFeeRequiredValidator } from 'src/app/Validation/RouterFeeRequiredValidator';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IOfferAddOrUpdate,
  IOfferView,
  IProvider,
} from 'src/app/models/IOffer';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { Select, initTE } from 'tw-elements';
import { OfferService } from 'src/app/services/offer.service';
import { ProviderService } from 'src/app/services/provider.service';
@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent implements OnInit {
  showRouterFee = true;
  Providers: IProvider[] = [];
  state: 'update' | 'add' = 'add';
  OfferName = new FormControl('', [Validators.required]);
  NumberOfMonths = new FormControl('', [Validators.required]);
  NumberOfFreeMonths = new FormControl('', [Validators.required]);
  Discount = new FormControl('', [Validators.required]);
  IsPercent = new FormControl<boolean | null>(false);
  FreeMonthsFirst = new FormControl<boolean | null>(false);
  CancelFee = new FormControl('', [Validators.required]);
  FreeRouter = new FormControl<boolean | null>(false);
  RouterFee = new FormControl('');
  Provider = new FormControl('', [Validators.required]);
  IsTotalBill = new FormControl<Boolean | null>(false);
  OfferForm = new FormGroup(
    {
      OfferName: this.OfferName,
      NumberOfMonths: this.NumberOfMonths,
      NumberOfFreeMonths: this.NumberOfFreeMonths,
      Discount: this.Discount,
      IsPercent: this.IsPercent,
      FreeMonthsFirst: this.FreeMonthsFirst,
      CancelFee: this.CancelFee,
      FreeRouter: this.FreeRouter,
      RouterFee: this.RouterFee,
      Provider: this.Provider,
      IsTotalBill: this.IsTotalBill,
    },
    [
      FreeMonthsValidator.checkFreeMonths(
        'NumberOfFreeMonths',
        'NumberOfMonths'
      ),
      RouterFeeRequiredValidator.Required,
    ]
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private OfferService: OfferService,
    private ProviderService: ProviderService,
    private ngMaterial: AngularMateralService,
    private router: Router
  ) {}
  ngOnInit(): void {
    initTE({ Select });
    const id = this.activatedRoute.snapshot.params.id;
    this.ProviderService.GetAll().subscribe({
      next: (data) => {
        this.Providers = data;
      },
    });
    if (id) {
      this.state = 'update';
      this.OfferService.GetById(id).subscribe({
        next: (data) => {
          this.showRouterFee = !data.freeRouter;
          this.OfferForm.setValue({
            OfferName: data.name,
            NumberOfMonths: data.numberOfMonths.toString(),
            NumberOfFreeMonths: data.numberOfFreeMonths.toString(),
            Discount: data.discount.toString(),
            IsPercent: data.isPercent,
            FreeMonthsFirst: data.freeMonthsFirst,
            CancelFee: data.cancelFee.toString(),
            FreeRouter: data.freeRouter,
            RouterFee: data.routerPrice.toString(),
            Provider: data.provider.id.toString(),
            IsTotalBill: data.isPercent,
          });
        },
      });
    }
  }
  FormHandler() {
    const Offer: IOfferAddOrUpdate = {
      name: this.OfferName.value!,
      numberOfMonths: Number(this.NumberOfMonths.value),
      numberOfFreeMonths: Number(this.NumberOfFreeMonths.value),
      discount: Number(this.Discount.value),
      isPercent: Boolean(this.IsPercent.value),
      freeMonthsFirst: Boolean(this.FreeMonthsFirst.value),
      cancelFee: Number(this.CancelFee.value),
      freeRouter: Boolean(this.FreeRouter.value),
      routerPrice: Number(this.RouterFee.value),
      providerId: Number(this.Provider.value),
      isTotalBill: Boolean(this.IsTotalBill.value),
    };
    console.log(Offer);
    const sub = {
      next: () => {
        this.ngMaterial.addAndUpdateSuccess(
          `Offer Has Been ${
            this.state == 'add' ? 'Added' : 'Updated'
          } Successfully`
        );
        this.router.navigateByUrl('/offers');
      },
      error: (e: any) => {
        this.ngMaterial.addAndUpdateSuccess(
          'An Error Occured. Try Again Later !'
        );
        console.log(e);
      },
    };
    if (this.state == 'add') {
      this.OfferService.Add(Offer).subscribe(sub);
    } else {
      Offer.id = this.activatedRoute.snapshot.params.id;
      this.OfferService.Update(Offer.id!, Offer).subscribe(sub);
    }
  }
  disableRouterfee(e: boolean) {
    this.showRouterFee = !e;
  }
}
