import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export default function IsNumberValidator(control: AbstractControl) {
  const error = isNaN(control.value)
    ? {
        isNan: isNaN(control.value),
      }
    : null;
  control.setErrors(error);
  return error;
}
