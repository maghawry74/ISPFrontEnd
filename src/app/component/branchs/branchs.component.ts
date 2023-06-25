import { Component, OnInit } from '@angular/core';
import { IBranch } from 'src/app/models/IBranch';
import { Branch } from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { BranchService } from 'src/app/services/branch.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.css'],
})
export class BranchsComponent implements OnInit {
  branchs: IBranch[] = [];
  isError = false;
  isLoading = true;
  EditPermission = false;
  DeletePermission = false;
  CreatePermission = false;
  p:number=1;
  constructor(
    private branchService: BranchService,
    private ngMaterialService: AngularMateralService,
    public userService: UserService
  ) {
    this.EditPermission = userService.CheckPermission(Branch.Update);
    this.DeletePermission = userService.CheckPermission(Branch.Delete);
    this.CreatePermission = userService.CheckPermission(Branch.Create);
  }
  ngOnInit(): void {
    this.branchService.GetAll().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.branchs = data;
      },
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
        console.log(e);
      },
    });
  }
  DeleteBranch(id: number) {
    this.ngMaterialService
      .openConfirmDialog('Are you sure you want to delete this Branch?')
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.branchService.Delete(id).subscribe({
            next: (data) => {
              this.branchs = this.branchs.filter((b) => b.id != id);
              this.ngMaterialService.addAndUpdateSuccess(
                'Branch Has Been Deleted Successfully'
              );
            },
            error: (e) => {
              this.ngMaterialService.addAndUpdateSuccess(
                "'An Error Occured. Try Again Later !'"
              );
            },
          });
        }
      });
  }
}
