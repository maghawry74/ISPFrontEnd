import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import IsNumberValidator from 'src/app/Validation/IsNumberValidator';
import { IGovernarate } from 'src/app/models/igovernarate';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { BranchService } from 'src/app/services/branch.service';
import { GovernorateService } from 'src/app/services/governorate.service';
import { Select, initTE } from 'tw-elements';
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
})
export class AddBranchComponent implements OnInit {
  state: 'Update' | 'Add' = 'Add';
  governorates: IGovernarate[] = [];
  managers = [];
  constructor(
    private branchService: BranchService,
    private governorateService: GovernorateService,
    private activatedRoute: ActivatedRoute,
    private ngService: AngularMateralService,
    private router:Router
  ) {
    this.governorateService.GetAll().subscribe((data) => {
      this.governorates = data;
    });

    const id = activatedRoute.snapshot.params.id;
    if (id) {
      this.state = 'Update';
      this.branchService.GetById(id).subscribe({
        next: (data) => {
          this.branchFrom.setValue({
            Name: data.name,
            Tel1: data.tel1,
            Tel2: data.tel2,
            Phone1: data.phone1,
            Phone2: data.phone2,
            Fax: data.fax,
            Governorate: String(data.governorate?.code),
            Manager: data.managerName,
          });
        },
      });
    }
  }
  ngOnInit(): void {
    initTE({ Select });
  }
  Governorate = new FormControl('', [Validators.required]);
  Name = new FormControl('', [Validators.required]);
  Tel1 = new FormControl('', [Validators.required, IsNumberValidator]);
  Tel2 = new FormControl('', [Validators.required, IsNumberValidator]);
  Phone1 = new FormControl('', [Validators.required, IsNumberValidator]);
  Phone2 = new FormControl('', [Validators.required, IsNumberValidator]);
  Fax = new FormControl('', [Validators.required, IsNumberValidator]);
  Manager = new FormControl<string | null>(null);
  branchFrom = new FormGroup({
    Name: this.Name,
    Tel1: this.Tel1,
    Tel2: this.Tel2,
    Phone1: this.Phone1,
    Phone2: this.Phone2,
    Fax: this.Fax,
    Governorate: this.Governorate,
    Manager: this.Manager,
  });

  FromSubmit() {
    const Branch = {
      id: this.activatedRoute.snapshot.params.id,
      name: this.Name.value,
      tel1: this.Tel1.value,
      tel2: this.Tel2.value,
      phone1: this.Phone1.value,
      phone2: this.Phone2.value,
      fax: this.Fax.value,
      managerId: this.Manager.value,
      governorateCode: this.Governorate.value,
    };
    const Sub = {
      next: () => {
        this.ngService.addAndUpdateSuccess(
          `Branch Has Been ${
            this.state == 'Add' ? 'Added' : 'Updated'
          } Successfully`
        );
        this.router.navigate(['/branch'])
      },
      error: (e: any) => {
        this.ngService.addAndUpdateSuccess(
          'Error Has Occured. Try Again Later!'
        );
        console.log(e);
      },
    };
    if (this.state == 'Add') {
      this.branchService.Add(Branch).subscribe(Sub);
    } else {
      this.branchService
        .Update(this.activatedRoute.snapshot.params.id, Branch)
        .subscribe(Sub);
    }
    console.log(Branch);
  }
}
