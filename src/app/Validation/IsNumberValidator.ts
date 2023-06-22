import { AbstractControl } from '@angular/forms';

export default function IsNumberValidator(control: AbstractControl) {
  if (control.value === null || control.value === undefined) {
    return null;
  }
  if (!/^[0-9]+$/.test(control.value)) {
    return { isNan: isNaN(control?.value) };
  }
  return null;
}
