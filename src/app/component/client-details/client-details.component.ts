import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBill } from 'src/app/models/IBill';
import { IClient } from 'src/app/models/IClient';
import { Bill } from 'src/app/models/Permission';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { ClientService } from 'src/app/services/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent {
  ssn = '';
  NextMonth = 1;
  isLoading = true;
  isError = false;
  EditPermission = false;
  bills: IBill[] = [];
  constructor(
    activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private userService: UserService,
    private ngService: AngularMateralService
  ) {
    this.EditPermission = userService.CheckPermission(Bill.Update);
    this.ssn = activatedRoute.snapshot.params.id;
    if (this.ssn) {
      clientService.GetBills({ Ssid: this.ssn, Condition: false }).subscribe({
        next: (data) => {
          this.isLoading = false;
          console.log(data);
          this.bills = data;
        },
        error: (e) => {
          this.isLoading = false;
          this.isError = true;
          console.log(e);
        },
      });
    }
  }

  PayBill(id: number) {
    console.log(id);
    this.clientService.PayBill({ ssid: this.ssn, id }).subscribe({
      next: (data) => {
        this.ngService.addAndUpdateSuccess(
          'Bill Has Been Updated Successfully'
        );
        this.bills = this.bills.filter((b) => b.id != id);
      },
      error: (e) => {
        console.log(e);
        this.ngService.addAndUpdateSuccess(
          'An Error Has Ocurred, Try Again Later.'
        );
      },
    });
  }
  GetNextBill() {
    console.log('cliked');
    console.log(this.NextMonth);
    this.clientService
      .GetNextBill({ ssid: this.ssn, Month: this.NextMonth++ })
      .subscribe({
        next: (data) => {
          console.log(data);
          data.OntheFly = true;
          this.bills.push(data);
        },
        error: (e) => {
          console.log(e);
        },
      });
  }
}
