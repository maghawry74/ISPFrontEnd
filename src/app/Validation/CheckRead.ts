import { AbstractControl } from '@angular/forms';

export default function CheckRead(controlName: string) {
  return (control: AbstractControl) => {
    const parent = control.parent;
    const formValue = parent?.value;
    if (
      control.value == 'true' ||
      (control.value == true && formValue[controlName] == false)
    ) {
      formValue[controlName] = true;
      parent?.patchValue(formValue);
      control.setValue(true);
    }
    return null;
  };
}
