import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICentralView } from 'src/app/models/ICentral';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { APIService } from 'src/app/services/api.service';

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
    private APIService: APIService,
    private router: Router,
    private ngMaterialService: AngularMateralService
  ) {}
  ngOnInit(): void {
    this.APIService.GetAll<ICentralView>('Central').subscribe({
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
    return () => {
      this.APIService.Delete('Central', id).subscribe({
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
