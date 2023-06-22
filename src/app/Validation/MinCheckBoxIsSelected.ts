import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class MinCheckBoxIsSelected {
  static Min(num: number): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const value = form.value;
      for (let val of Object.values(value)) {
        if (typeof val == 'object' && val != null) {
          for (let value of Object.values(val)) {
            if (value == true || value == 'true') {
              return null;
            }
          }
        }
      }
      return { NoSelection: true };
    };
  }
}
