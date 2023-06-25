import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { UserService } from '../services/user.service';
export function checkEmailValidation(
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return userService
      .checkExistingUser(control.value)
      .pipe(
        map((resp: boolean) => (resp ? { userAlreadyExists: true }:null)),
        catchError(() => of(null))
      );
  };
}
