import { IPackageAdd } from './../../models/IPackage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iprovider } from 'src/app/models/iprovider';
import { ProviderService } from 'src/app/services/provider.service';
import { Location } from '@angular/common';
import { Ripple, Input, initTE, Select } from 'tw-elements';
import { PackageService } from 'src/app/services/package.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
})
export class AddPackageComponent implements OnInit {
  packageForm;
  UpdateOrDelete: boolean;
  currentId: number = 0;
  formTitle: string;
  providerList: Iprovider[] = [];
  constructor(
    private fb: FormBuilder,
    private ProviderService: ProviderService,
    private Location: Location,
    private packageService: PackageService,
    private router: Router,
    private angularMaterailaServ: AngularMateralService,
    private activateRoute: ActivatedRoute
  ) {
    this.UpdateOrDelete = true;
    (this.formTitle = 'Add New Package'),
      (this.packageForm = fb.group({
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        price: ['', [Validators.required]],
        purchasePrice: ['', [Validators.required]],
        note: [''],
        providerId: ['', [Validators.required]],
      }));
    //get providerList
    this.ProviderService.GetAll().subscribe((data) => {
      this.providerList = data;
    });
  }
  ngOnInit(): void {
    initTE({ Ripple, Input, Select });
    this.activateRoute.paramMap.subscribe((resp) => {
      this.currentId = Number(resp.get('id'));
      if (this.currentId != 0) {
        this.UpdateOrDelete = false;
        this.formTitle = 'Update Package';
        this.packageService.GetById(this.currentId).subscribe((pack) => {
          this.packageForm.patchValue({
            name: pack.name,
            type: pack.type,
            price: pack.price.toString(),
            purchasePrice: pack.purchasePrice.toString(),
            note: pack.note,
            providerId: String(pack.provider.id),
          });
        });
      }
    });
  }

  get name() {
    return this.packageForm.get('name');
  }
  get type() {
    return this.packageForm.get('type');
  }
  get price() {
    return this.packageForm.get('price');
  }
  get note() {
    return this.packageForm.get('note');
  }
  get purchasePrice() {
    return this.packageForm.get('purchasePrice');
  }
  get providerId() {
    return this.packageForm.get('providerId');
  }
  addPackage() {
    let newPackage = this.packageForm.value;
    this.packageService.Add(newPackage).subscribe({
    next:(resp)=>{
      this.router.navigate(['/Packages']);
      this.angularMaterailaServ.addAndUpdateSuccess("Package Added Successfully");
      
    },
    error:(e)=>{
      console.log(e);
      this.angularMaterailaServ.addAndUpdateSuccess("'An Error Occured Try Again Later'");
    }
  })

  }
  updatePack() {
    const updatedPack = {
      id: this.currentId,
      name: this.name?.value,
      type: this.type?.value,
      price: this.price?.value,
      purchasePrice: this.purchasePrice?.value,
      note: this.note?.value,
      providerId: this.providerId?.value,
    };
    this.packageService.Update(this.currentId, updatedPack).subscribe({
      next: (resp) => {
        this.router.navigate(['/Packages']);
        this.angularMaterailaServ.addAndUpdateSuccess(
          'Package Updated Successfully'
        );
      },
      error: (e) => {
        console.log(e);
        this.angularMaterailaServ.addAndUpdateSuccess(
          "'An Error Occured Try Again Later'"
        );
      },
    });
  }
  backToPackList() {
    this.Location.back();
  }
}
