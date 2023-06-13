import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICentralView } from 'src/app/models/ICentral';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-centrals',
  templateUrl: './centrals.component.html',
  styleUrls: ['./centrals.component.css'],
})
export class CentralsComponent implements OnInit {
  centrals: ICentralView[] = [];
  isLoading = true;
  isError = false;
  constructor(
    private CentralService: CentralService,
    private router: Router,
    private ngMaterialService: AngularMateralService
  ) {}
  ngOnInit(): void {
    this.CentralService.GetAllCentrals().subscribe({
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
    console.log(id);
    this.router.navigateByUrl(`/Centrals/Edit/${id}`);
  }

  DeleteCentral(id: number) {
    console.log('Out');
    return () => {
      console.log('in');
      this.CentralService.DeleteCentral(id).subscribe({
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
    };
  }
}
