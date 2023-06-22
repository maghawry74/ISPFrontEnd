import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MinCheckBoxIsSelected } from 'src/app/Validation/MinCheckBoxIsSelected';
import { IRoleClaim } from 'src/app/models/IRole';
import { IRoleFrom } from 'src/app/models/IRoleForm';
import {
  Branch,
  Central,
  Client,
  Governorate,
  Offer,
  Package,
  Provider,
  Role,
  User,
} from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent /*implements OnInit*/ {
  state: 'Update' | 'Add' = 'Add';
  roleFrom: FormGroup;
  constructor(
    private ngMaterial: AngularMateralService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.roleFrom = fb.group(
      {
        roleName: ['', Validators.required],
        Branch: fb.group({
          [Branch.Create]: [false, Validators.required],
          [Branch.Delete]: [false, Validators.required],
          [Branch.Read]: [false, Validators.required],
          [Branch.Update]: [false, Validators.required],
        }),
        Central: fb.group({
          [Central.Create]: [false, Validators.required],
          [Central.Delete]: [false, Validators.required],
          [Central.Read]: [false, Validators.required],
          [Central.Update]: [false, Validators.required],
        }),
        Client: fb.group({
          [Client.Create]: [false, Validators.required],
          [Client.Delete]: [false, Validators.required],
          [Client.Read]: [false, Validators.required],
          [Client.Update]: [false, Validators.required],
        }),
        Governorate: fb.group({
          [Governorate.Create]: [false, Validators.required],
          [Governorate.Delete]: [false, Validators.required],
          [Governorate.Read]: [false, Validators.required],
          [Governorate.Update]: [false, Validators.required],
        }),
        Offer: fb.group({
          [Offer.Create]: [false, Validators.required],
          [Offer.Delete]: [false, Validators.required],
          [Offer.Read]: [false, Validators.required],
          [Offer.Update]: [false, Validators.required],
        }),
        Package: fb.group({
          [Package.Create]: [false, Validators.required],
          [Package.Delete]: [false, Validators.required],
          [Package.Read]: [false, Validators.required],
          [Package.Update]: [false, Validators.required],
        }),
        Provider: fb.group({
          [Provider.Create]: [false, Validators.required],
          [Provider.Delete]: [false, Validators.required],
          [Provider.Read]: [false, Validators.required],
          [Provider.Update]: [false, Validators.required],
        }),
        Role: fb.group({
          [Role.Create]: [false, Validators.required],
          [Role.Delete]: [false, Validators.required],
          [Role.Read]: [false, Validators.required],
          [Role.Update]: [false, Validators.required],
        }),
        User: fb.group({
          [User.Create]: [false, Validators.required],
          [User.Delete]: [false, Validators.required],
          [User.Read]: [false, Validators.required],
          [User.Update]: [false, Validators.required],
        }),
      },
      { Validators: [MinCheckBoxIsSelected.Min(1)] }
    );

    const id = activatedRoute.snapshot.params.id;
    if (id) {
      this.state = 'Update';
      roleService.GetById(id).subscribe((data) => {
        console.log(data);
        this.roleFrom.patchValue({
          roleName: data.name,
        });
        data.claims.forEach((c) => {
          const entity = c.type.split('.').at(1) as string;
          let entityGroup = this.roleFrom.get(entity);
          entityGroup?.patchValue({
            [c.type]: c.value,
          });
        });
      });
    }
  }

  FromSubmit() {
    const claims: string[] = [];
    Object.entries(this.roleFrom.controls).forEach((entry) => {
      if (typeof entry[1].value == 'object') {
        Object.entries(entry[1].value).forEach(([key, value]) => {
          if (value == true || value == 'true') {
            claims.push(key);
          }
        });
      }
    });
    console.log(claims);
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
        name: this.roleFrom.get('roleName')?.value,
        normalizedName: this.roleFrom.get('roleName')?.value.toUpperCase(),
        claims,
      };
      this.roleService.Add(role).subscribe(sub);
    } else {
      const role = {
        id: this.activatedRoute.snapshot.params.id,
        name: this.roleFrom.get('roleName')?.value,
        normalizedName: this.roleFrom.get('roleName')?.value.toUpperCase(),
        claims,
      };
      this.roleService.Update(role.id, role).subscribe(sub);
    }
  }
}
