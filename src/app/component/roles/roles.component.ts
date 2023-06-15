import { Component } from '@angular/core';
import { IRole } from 'src/app/models/IRole';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent {
  roles: IRole[] = [];
  isError = false;
  isLoading = true;

  constructor(
    private roleService: RoleService,
    private ngMaterial: AngularMateralService
  ) {
    roleService.GetAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.roles = data;
      },
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
        console.log(e);
      },
    });
  }

  DeleteRole(id: string) {
    return () => {
      this.roleService.Delete(id).subscribe({
        next: () => {
          this.ngMaterial.addAndUpdateSuccess(
            'Role Has Been Deleted Successfully'
          );
          this.roles = this.roles.filter((r) => r.id != id);
        },
        error: (e) => {
          this.ngMaterial.addAndUpdateSuccess(
            'An Error Has Occurred. Try Again Later'
          );
          console.log(e);
        },
      });
    };
  }
}
