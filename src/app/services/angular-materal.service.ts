import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../component/mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AngularMateralService {

  constructor(private snackBar:MatSnackBar,private dialog:MatDialog) { 

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

 //confirm dialog method
 openConfirmDialog(msg:string)
 {
 return this.dialog.open(MatConfirmDialogComponent,{
    width:'430px',
    panelClass:'confirm-dialog-container',
    disableClose:true,
    enterAnimationDuration:"500ms",
    exitAnimationDuration:"500ms",
    position:{top:"20px"},
    data:{
      message:msg
    }
  });
 }
}
