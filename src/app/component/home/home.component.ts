import { Component } from '@angular/core';
import { Info } from 'src/app/models/Info';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  today: Date;
  ISpInfo: Info | null = null;
  UserName = 'Ya User';
  constructor(private sharedService: SharedService, userService: UserService) {
    this.today = new Date();
    this.UserName = userService.Name;
    sharedService.GetInfo().subscribe((data: Info) => (this.ISpInfo = data));
  }
}
