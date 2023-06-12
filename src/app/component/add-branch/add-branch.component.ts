import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, initTE } from 'tw-elements';
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
})
export class AddBranchComponent implements OnInit {
  ngOnInit(): void {
    initTE({ Select });
  }
  Governorate = new FormControl('', [Validators.required]);
  Name = new FormControl('', [Validators.required]);
  Tel1 = new FormControl('', [Validators.required]);
  Tel2 = new FormControl('', [Validators.required]);
  Phone1 = new FormControl('', [Validators.required]);
  Phone2 = new FormControl('', [Validators.required]);
  Fax = new FormControl('', [Validators.required]);
  Manager = new FormControl('');
  branchFrom = new FormGroup({
    Name: this.Name,
    Tel1: this.Tel1,
    Tel2: this.Tel2,
    Phone1: this.Phone1,
    Phone2: this.Phone2,
    Fax: this.Fax,
    Governorate: this.Governorate,
  });

  FromSubmit() {
    const newBranch = {
      Name: this.Name.value,
      Tel1: this.Tel1.value,
      Tel2: this.Tel2.value,
      Phone1: this.Phone1.value,
      Phone2: this.Phone2.value,
      Fax: this.Fax.value,
      Manager: this.Manager.value,
    };

    console.log(newBranch);
  }
}
