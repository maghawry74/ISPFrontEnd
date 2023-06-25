import { Component } from '@angular/core';
import { IRole } from 'src/app/models/IRole';
import { Role } from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent {
  roles: IRole[] = [];
  isError = false;
  isLoading = true;
  EditPermission = false;
  DeletePermission = false;
  CreatePermission = false;
  p:number = 1;
  constructor(
    private roleService: RoleService,
    private ngMaterial: AngularMateralService,
    private userService: UserService
  ) {
    this.EditPermission = userService.CheckPermission(Role.Update);
    this.DeletePermission = userService.CheckPermission(Role.Delete);
    this.CreatePermission = userService.CheckPermission(Role.Create);
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
    this.ngMaterial.openConfirmDialog("Are you sure you want to delete this Role?")
    .afterClosed().subscribe(resp=>{
      if(resp)
      {
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
    }
    })

  }
}
