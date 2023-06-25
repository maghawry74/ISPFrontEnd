import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

import { ClientService } from '../services/client.service';

export function IsUniqueSSN(clientService: ClientService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return clientService.GetById(control.value).pipe(
      map((res) => {
        console.log(res)
        return { IsUsed: true };
      }),
      catchError(() => {
        return of(null);
      })
    );
  };
}
