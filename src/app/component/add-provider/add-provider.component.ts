import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ripple, Input, initTE } from 'tw-elements';
import { ProviderService } from 'src/app/services/provider.service';
import { Location } from '@angular/common';
import { Iprovider } from 'src/app/models/iprovider';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css'],
})
export class AddProviderComponent implements OnInit {
  providerForm;
  UpdateOrDelete: boolean;
  currentId: number = 0;
  formTitle: string;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private ProviderService: ProviderService,
    private location: Location,
    private router: Router,
    private angularMaterailaServ: AngularMateralService
  ) {
    this.UpdateOrDelete = true;
    (this.formTitle = 'Add New Provider'),
      (this.providerForm = fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
      }));
  }
  ngOnInit(): void {
    initTE({ Ripple, Input });
    this.activateRoute.paramMap.subscribe((param) => {
      this.currentId = Number(param.get('id'));
      if (this.currentId != 0) {
        this.UpdateOrDelete = false;
        this.formTitle = 'Update Provider';
        this.ProviderService.GetById(this.currentId).subscribe((prov) => {
          this.providerForm.setValue({
            name: prov.name,
          });
        });
      }
    });
  }
  //get name
  get name() {
    return this.providerForm.get('name');
  }
  //backToProvidersList
  backToProvList() {
    this.location.back();
  }
  //add provider
  addProvider() {
    let newProv: Iprovider = this.providerForm.value as Iprovider;
    this.ProviderService.Add(newProv).subscribe({
      next: (resp) => {
        this.angularMaterailaServ.addAndUpdateSuccess(
          'Provider Added Successfully'
        );
        this.providerForm.reset();
      },
      error: (e) => {
        this.angularMaterailaServ.addAndUpdateSuccess(
          "'An Error Occured Try Again Later'"
        );
      },
    });
  }
  //update Provider
  updateProv() {
    const newProv = {
      id: this.currentId,
      name: this.providerForm.get('name')!.value,
    };
    this.ProviderService.Update(this.currentId, newProv).subscribe({
      next: (resp) => {
        this.router.navigate(['/Providers']);
        this.angularMaterailaServ.addAndUpdateSuccess(
          'provider Updated Successfully'
        );
      },
      error: (e) => {
        this.angularMaterailaServ.addAndUpdateSuccess(
          "'An Error Occured Try Again Later'"
        );
      },
    });
  }
}
