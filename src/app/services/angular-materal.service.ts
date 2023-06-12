import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AngularMateralService {

  constructor(private snackBar:MatSnackBar) { 

  }
  addAndUpdateSuccess(mess:string)
  {
    this.snackBar.open(mess,'',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition: 'right',
      panelClass: ['blue-snackbar'],
    })
  }

 
}
