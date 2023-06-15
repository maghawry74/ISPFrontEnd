import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MinCheckBoxIsSelected } from 'src/app/Validation/MinCheckBoxIsSelected';
import { IRoleClaim } from 'src/app/models/IRole';
import { IRoleFrom } from 'src/app/models/IRoleForm';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  state: 'Update' | 'Add' = 'Add';
  isAdminSelected = false;
  roleName = new FormControl('', [Validators.required]);
  admin = new FormControl<boolean | null>(false);
  search = new FormControl<boolean | null>(false);
  addNewClient = new FormControl<boolean | null>(false);
  clientRequests = new FormControl<boolean | null>(false);
  roleFrom = new FormGroup({
    roleName: this.roleName,
    admin: this.admin,
    search: this.search,
    clientRequests: this.clientRequests,
    addNewClient: this.addNewClient,
  },[MinCheckBoxIsSelected.Min(1)]);

  constructor(
    private ngMaterial: AngularMateralService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute
  ) {
    const id = activatedRoute.snapshot.params.id;
    if (id) {
      this.state = 'Update';
      roleService.GetById(id).subscribe((data) => {
        let newValues = this.roleFrom.value as IRoleFrom;
        newValues.roleName = data.name;
        data.claims.forEach((c) => {
          newValues[c.type] = c.value;
        });
        this.roleFrom.setValue(newValues);
      });
    }
  }
  ngOnInit(): void {
    this.admin.valueChanges.subscribe((data) => {
      this.roleFrom.patchValue({
        search: false,
        clientRequests: false,
        addNewClient: false,
      });
      this.isAdminSelected = data!;
    });
  }

  FromSubmit() {
    const claims: IRoleClaim[] = [];
    Object.entries(this.roleFrom.controls).forEach((entry) => {
      if (entry[1].value == true || entry[1].value == 'true') {
        claims.push({ type: entry[0], value: entry[1].value.toString() });
      }
    });
    const sub = {
      next: () => {
        this.ngMaterial.addAndUpdateSuccess(
          `Role Has Been ${
            this.state == 'Add' ? 'Added' : 'Updated'
          } Successfully`
        );
      },
      error: (e: Error) => {
        this.ngMaterial.addAndUpdateSuccess(
          'Error Has occurred. Try Again Later!'
        );
        console.log(e);
      },
    };
    if (this.state == 'Add') {
      const role = {
        name: this.roleName.value,
        normalizedName: this.roleName.value?.toUpperCase(),
        claims,
      };
      this.roleService.Add(role).subscribe(sub);
    } else {
      console.log(this.roleFrom.value);
      console.log(claims);
      const role = {
        id: this.activatedRoute.snapshot.params.id,
        name: this.roleName.value,
        normalizedName: this.roleName.value?.toUpperCase(),
        claims,
      };
      this.roleService.Update(role.id, role).subscribe(sub);
    }
  }
}
