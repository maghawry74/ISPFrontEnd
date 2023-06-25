import { Component } from '@angular/core';
import { IClient } from 'src/app/models/IClient';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {
  clients: IClient[] = [];
  EditPermission = true;
  DeletePermission = true;
  CreatePermission = true;
  isLoading = true;
  isError = false;
  p:number=1;

  constructor(private clientService: ClientService, private AngularMateralService:AngularMateralService) {
    clientService.GetAll().subscribe({
      next: (data) => {
        console.log(data);
        this.clients = data;
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false;
        this.isError = true;
      },
    });
  }
  deleteClient(ssid:string)
  {
    this.AngularMateralService
      .openConfirmDialog('Are you sure you want to delete this Client?')
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.clientService.Delete(ssid).subscribe({
            next: (data) => {
              this.clients = this.clients.filter((b) => b.ssid != ssid);
              this.AngularMateralService.addAndUpdateSuccess(
                'Branch Has Been Deleted Successfully'
              );
            },
            error: (e) => {
              this.AngularMateralService.addAndUpdateSuccess(
                "'An Error Occured. Try Again Later !'"
              );
            },
          });
        }
      });
  }
}
