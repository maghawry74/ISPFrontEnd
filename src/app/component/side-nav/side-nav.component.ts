import { Component } from '@angular/core';
import {
  Bill,
  Branch,
  Central,
  Client,
  Governorate,
  Offer,
  Package,
  Provider,
  Role,
  User,
} from 'src/app/models/Permission';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  ReadBranch = false;
  ReadCentral = false;
  ReadClient = false;
  ReadGovernorate = false;
  ReadPackage = false;
  ReadProvider = false;
  ReadOffer = false;
  ReadRole = false;
  ReadEmployee = false;
  ReadBill = false;
  constructor(private userService: UserService) {
    this.ReadBranch = userService.CheckPermission(Branch.Read);
    this.ReadCentral = userService.CheckPermission(Central.Read);
    this.ReadClient = userService.CheckPermission(Client.Read);
    this.ReadGovernorate = userService.CheckPermission(Governorate.Read);
    this.ReadPackage = userService.CheckPermission(Package.Read);
    this.ReadProvider = userService.CheckPermission(Provider.Read);
    this.ReadOffer = userService.CheckPermission(Offer.Read);
    this.ReadRole = userService.CheckPermission(Role.Read);
    this.ReadEmployee = userService.CheckPermission(User.Read);
    this.ReadBill = userService.CheckPermission(Bill.Read);
  }
  SignOut() {
    this.userService.LogOut();
  }
}
