import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class RouterFeeRequiredValidator {
  static Required(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const isRouterFree = form.get('FreeRouter');
      const routerFee = form.get('RouterFee');

      const error =
        isRouterFree?.value === false
          ? routerFee?.value < 0
            ? { required: true }
            : null
          : null;

      routerFee?.setErrors(error);
      return error;
    };
  }
}
