import { Component } from '@angular/core';
import { IClient } from 'src/app/models/IClient';
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

  constructor(private clientService: ClientService) {
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
}
