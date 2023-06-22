import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICentralView } from 'src/app/models/ICentral';
import { Central } from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { CentralService } from 'src/app/services/central.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-centrals',
  templateUrl: './centrals.component.html',
  styleUrls: ['./centrals.component.css'],
})
export class CentralsComponent implements OnInit {
  centrals: ICentralView[] = [];
  EditPermission = false;
  DeletePermission = false;
  CreatePermission = false;
  isLoading = true;
  isError = false;
  p: number = 1;
  constructor(
    private CentralService: CentralService,
    private router: Router,
    private ngMaterialService: AngularMateralService,
    public userService: UserService
  ) {
    this.EditPermission = userService.CheckPermission(Central.Update);
    this.DeletePermission = userService.CheckPermission(Central.Delete);
    this.CreatePermission = userService.CheckPermission(Central.Create);
  }
  ngOnInit(): void {
    this.CentralService.GetAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.centrals = data;
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false;
        this.isError = true;
      },
    });
  }

  EditCentral(id: number) {
    this.router.navigateByUrl(`/Centrals/Edit/${id}`);
  }

  DeleteCentral(id: number) {
    this.ngMaterialService
      .openConfirmDialog('Are you sure you want to delete this central?')
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.CentralService.Delete(id).subscribe({
            next: (data) => {
              this.centrals = this.centrals.filter((c) => c.id != id);
              this.ngMaterialService.addAndUpdateSuccess(
                'Central Has Been Deleted Successfully'
              );
            },
            error: (e) =>
              this.ngMaterialService.addAndUpdateSuccess(
                'An Error Occured. Try Again Later !'
              ),
          });
        }
      });
  }
}
