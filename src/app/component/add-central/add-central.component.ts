import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICentralView } from 'src/app/models/ICentral';
import { IGovernarate } from 'src/app/models/igovernarate';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { CentralService } from 'src/app/services/central.service';
import { GovernorateService } from 'src/app/services/governorate.service';
import { Select, initTE } from 'tw-elements';
@Component({
  selector: 'app-add-central',
  templateUrl: './add-central.component.html',
  styleUrls: ['./add-central.component.css'],
})
export class AddCentralComponent implements OnInit {
  private state: 'update' | 'add' = 'add';
  formTitle: string = 'Add New  Central';
  governorates: IGovernarate[] = [];
  constructor(
    private activeRoute: ActivatedRoute,
    private centralService: CentralService,
    private governorateService: GovernorateService,
    private angularMaterialService: AngularMateralService,
    private router: Router
  ) {
    const id = activeRoute.snapshot.params.id;
    if (id) {
      this.state = 'update';
      this.formTitle = 'Update Central';
      centralService.GetById(id).subscribe({
        next: (data) => {
          console.log(data);
          this.centralFrom.patchValue({
            CentralName: data.name,
           Governorate: data.governorate.code.toString(),
          });
        },
      });
    }
    this.governorateService.GetAll().subscribe({
      next: (data) => {
        this.governorates = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  CentralName = new FormControl('', [Validators.required]);
  Governorate = new FormControl('', [Validators.required]);

  centralFrom = new FormGroup({
    CentralName: this.CentralName,
    Governorate: this.Governorate,
  });

  ngOnInit(): void {
    initTE({ Select });
  }

  FromSubmit() {
    if (this.state == 'add') {
      const Central = {
        name: this.CentralName.value!,
        governorateCode: this.Governorate.value!,
      };
      this.centralService.Add(Central).subscribe({
        next: (data) => {
          this.angularMaterialService.addAndUpdateSuccess(
            'Central Has Been Added Successfully'
          );
          this.centralFrom.reset();
        },
        error: (e) => {
          this.angularMaterialService.addAndUpdateSuccess(
            'An Error Occured Try Again Later'
          );
          console.log(e);
        },
      });
    } else {
      const Central = {
        id: this.activeRoute.snapshot.params.id!,
        name: this.CentralName.value!,
        governorateCode: this.Governorate.value!,
      };
      this.centralService.Update(Central.id, Central).subscribe({
        next: (data) => {
          this.router.navigate(['/Centrals']);
          this.angularMaterialService.addAndUpdateSuccess(
            'Central Has Been Updated Successfully'
          );
        },
        error: (e) => {
          console.log(e);
          this.angularMaterialService.addAndUpdateSuccess(
            'An Error Occured Try Again Later'
          );
        },
      });
    }
  }
}
