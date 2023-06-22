import { Component } from '@angular/core';
import { IBranch } from 'src/app/models/IBranch';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.css'],
})
export class BranchsComponent {
  branchs: IBranch[] = [];
  isError = false;
  isLoading = true;
  constructor(private branchService: BranchService) {
    branchService.GetAll().subscribe({
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
  DeleteBranch(id: string) {
    return () => {};
  }
}
