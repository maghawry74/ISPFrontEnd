import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICentralView } from 'src/app/models/ICentral';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-centrals',
  templateUrl: './centrals.component.html',
  styleUrls: ['./centrals.component.css'],
})
export class CentralsComponent {
  centrals: ICentralView[] = [];
  constructor(private CentralService: CentralService, private router: Router) {
    CentralService.GetAllCentrals().subscribe({
      next: (data) => {
        console.log(data);
        this.centrals = data;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  EditCentral(id: number) {
    console.log(id);
    this.router.navigateByUrl(`/Centrals/Edit/${id}`);
  }

  DeleteCentral(id: number) {
    this.CentralService.DeleteCentral(id).subscribe({
      next: (data) => {},
      error: (e) => {},
    });
  }
}
