import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class FreeMonthsValidator {
  static checkFreeMonths(target: string, eleToCompare: string): ValidatorFn {
    return (FormGroup: AbstractControl): ValidationErrors | null => {
      const targetEle = FormGroup.get(target);
      const compare = FormGroup.get(eleToCompare);
      const error =
        targetEle?.value > compare?.value ? { freeMonths: true } : null;
      targetEle?.setErrors(error);
      return error;
    };
  }
}
