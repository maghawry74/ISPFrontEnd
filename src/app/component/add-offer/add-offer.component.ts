import { ChangeDetectorRef, Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FreeMonthsValidator } from 'src/app/Validation/FreeMonthsValidator';
import { RouterFeeRequiredValidator } from 'src/app/Validation/RouterFeeRequiredValidator';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],
})
export class AddOfferComponent {
  showRouterFee = true;

  OfferName = new FormControl('', [Validators.required]);
  NumberOfMonths = new FormControl('', [Validators.required]);
  NumberOfFreeMonths = new FormControl('', [Validators.required]);
  Discount = new FormControl('', [Validators.required]);
  IsPercent = new FormControl('');
  FreeMonthsFirst = new FormControl('');
  CancelFee = new FormControl('', [Validators.required]);
  FreeRouter = new FormControl('');
  RouterFee = new FormControl('');

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
    },
    [
      FreeMonthsValidator.checkFreeMonths(
        'NumberOfFreeMonths',
        'NumberOfMonths'
      ),
      RouterFeeRequiredValidator.Required,
    ]
  );
  FormHandler() {
    const newOffer = {
      OfferName: this.OfferName.value,
      NumberOfMonths: this.NumberOfMonths.value,
      NumberOfFreeMonths: this.NumberOfFreeMonths.value,
      Discount: this.Discount.value,
      IsPercent: Boolean(this.IsPercent.value),
      FreeMonthsFirst: Boolean(this.FreeMonthsFirst.value),
      CancelFee: this.CancelFee.value,
      FreeRouter: Boolean(this.FreeRouter.value),
      RouterFee: this.RouterFee.value,
    };

    console.log(newOffer);
  }
  disableRouterfee(e: boolean) {
    this.showRouterFee = !e;
  }
}
