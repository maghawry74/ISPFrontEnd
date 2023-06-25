import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import CheckRead from 'src/app/Validation/CheckRead';
import { MinCheckBoxIsSelected } from 'src/app/Validation/MinCheckBoxIsSelected';
import { IRoleClaim } from 'src/app/models/IRole';
import { IRoleFrom } from 'src/app/models/IRoleForm';
import {
  Bill,
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
    fb: FormBuilder,
    private router: Router
  ) {
    this.roleFrom = fb.group(
      {
        roleName: ['', Validators.required],
        Branch: fb.group({
          [Branch.Create]: [false, CheckRead(Branch.Read)],
          [Branch.Delete]: [false, CheckRead(Branch.Read)],
          [Branch.Read]: [false],
          [Branch.Update]: [false, CheckRead(Branch.Read)],
        }),
        Central: fb.group({
          [Central.Create]: [false, CheckRead(Central.Read)],
          [Central.Delete]: [false, CheckRead(Central.Read)],
          [Central.Read]: [false],
          [Central.Update]: [false, CheckRead(Central.Read)],
        }),
        Client: fb.group({
          [Client.Create]: [false, CheckRead(Client.Read)],
          [Client.Delete]: [false, CheckRead(Client.Read)],
          [Client.Read]: [false],
          [Client.Update]: [false, CheckRead(Client.Read)],
        }),
        Governorate: fb.group({
          [Governorate.Create]: [false, CheckRead(Governorate.Read)],
          [Governorate.Delete]: [false, CheckRead(Governorate.Read)],
          [Governorate.Read]: [false],
          [Governorate.Update]: [false, CheckRead(Governorate.Read)],
        }),
        Offer: fb.group({
          [Offer.Create]: [false, CheckRead(Offer.Read)],
          [Offer.Delete]: [false, CheckRead(Offer.Read)],
          [Offer.Read]: [false],
          [Offer.Update]: [false, CheckRead(Offer.Read)],
        }),
        Package: fb.group({
          [Package.Create]: [false, CheckRead(Package.Read)],
          [Package.Delete]: [false, CheckRead(Package.Read)],
          [Package.Read]: [false],
          [Package.Update]: [false, CheckRead(Package.Read)],
        }),
        Provider: fb.group({
          [Provider.Create]: [false, CheckRead(Provider.Read)],
          [Provider.Delete]: [false, CheckRead(Provider.Read)],
          [Provider.Read]: [false],
          [Provider.Update]: [false, CheckRead(Provider.Read)],
        }),
        Role: fb.group({
          [Role.Create]: [false, CheckRead(Role.Read)],
          [Role.Delete]: [false, CheckRead(Role.Read)],
          [Role.Read]: [false],
          [Role.Update]: [false, CheckRead(Role.Read)],
        }),
        User: fb.group({
          [User.Create]: [false, CheckRead(User.Read)],
          [User.Delete]: [false, CheckRead(User.Read)],
          [User.Read]: [false],
          [User.Update]: [false, CheckRead(User.Read)],
        }),
        Bill: fb.group({
          [Bill.Create]: [false, CheckRead(Bill.Read)],
          [Bill.Delete]: [false, CheckRead(Bill.Read)],
          [Bill.Read]: [false],
          [Bill.Update]: [false, CheckRead(Bill.Read)],
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
        this.router.navigate(['/roles']);
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
      this.router.navigate(['/roles']);
    }
  }
}
