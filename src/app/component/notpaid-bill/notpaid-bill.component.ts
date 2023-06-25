import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AngularMateralService } from '../../services/angular-materal.service';
import { IBill, IBillview } from 'src/app/models/IBill';

@Component({
  selector: 'app-notpaid-bill',
  templateUrl: './notpaid-bill.component.html',
  styleUrls: ['./notpaid-bill.component.css'],
})
export class NotpaidBillComponent implements OnInit {
  notBaidBillList:IBillview[]=[];
  p: number = 1;
  isLoading = true;
  isError = false;
  constructor(private clientService: ClientService) {}
  ngOnInit(): void {
    this.clientService.notPayBill().subscribe({
      next: (data) => {
        console.log(data);
        this.isLoading = false;
        this.notBaidBillList = data;
      },
      error: (e) => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }
}
