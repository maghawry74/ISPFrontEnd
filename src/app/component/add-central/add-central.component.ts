import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, initTE } from 'tw-elements';
@Component({
  selector: 'app-add-central',
  templateUrl: './add-central.component.html',
  styleUrls: ['./add-central.component.css'],
})
export class AddCentralComponent implements OnInit {
  CentralName = new FormControl('', [Validators.required]);
  Governorate = new FormControl('', [Validators.required]);

  centralFrom = new FormGroup({
    CentralName: this.CentralName,
    Governorate: this.Governorate,
  });

  ngOnInit(): void {
    initTE({ Select });
  }

  FromSubmit() {
    const newCentral = {
      CentralName: this.CentralName.value,
      Governorate: this.Governorate.value,
    };
    console.log(newCentral);
  }
}
