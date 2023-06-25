import { GovernateComponent } from './component/governate/governate.component';
import { AddGovernarateComponent } from './component/add-governarate/add-governarate.component';
import { LoginComponent } from './component/login/login.component';
import { AddOfferComponent } from './component/add-offer/add-offer.component';
import { ProviderComponent } from './component/provider/provider.component';
import { AddProviderComponent } from './component/add-provider/add-provider.component';
import { OffersComponent } from './component/offers/offers.component';
import { AddCentralComponent } from './component/add-central/add-central.component';
import { AddBranchComponent } from './component/add-branch/add-branch.component';
import { CentralsComponent } from './component/centrals/centrals.component';
import { PackageComponent } from './component/package/package.component';
import { AddPackageComponent } from './component/add-package/add-package.component';
import { BranchsComponent } from './component/branchs/branchs.component';
import { RolesComponent } from './component/roles/roles.component';
import { AddRoleComponent } from './component/add-role/add-role.component';
import { LoggedIn } from './component/RouteGuards/LoggedInGuard';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomeComponent } from './component/home/home.component';
import { HasPermission } from './component/RouteGuards/HasPermission';
import { AlreadyLogged } from './component/RouteGuards/AlreadyLogged';
import { UserComponent } from './component/user/user.component';
import { Routes } from '@angular/router';
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
} from './models/Permission';
import { ClientsComponent } from './component/clients/clients.component';
import { AddClientComponent } from './component/add-client/add-client.component';
import { ClientDetailsComponent } from './component/client-details/client-details.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { NotpaidBillComponent } from './component/notpaid-bill/notpaid-bill.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [LoggedIn],
  },
  {
    path: 'branch',
    component: BranchsComponent,
    canActivate: [LoggedIn, HasPermission],
    pathMatch: 'full',
    data: { Permission: Branch.Read },
  },
  {
    path: 'branch/add',
    component: AddBranchComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Branch.Create },
    pathMatch: 'full',
  },
  {
    path: 'branch/edit/:id',
    component: AddBranchComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Branch.Update },
    pathMatch: 'full',
  },
  {
    path: 'Centrals',
    component: CentralsComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Central.Read },
    pathMatch: 'full',
  },
  {
    path: 'Centrals/Add',
    component: AddCentralComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Central.Create },
    pathMatch: 'full',
  },
  {
    path: 'Centrals/Edit/:id',
    component: AddCentralComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Central.Update },
    pathMatch: 'full',
  },
  {
    path: 'Clients',
    component: ClientsComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Client.Read },
    pathMatch: 'full',
  },
  {
    path: 'Client/Bills/:id',
    component: ClientDetailsComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Bill.Read },
    pathMatch: 'full',
  },
  {
    path: 'Clients/Add',
    component: AddClientComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Client.Create },
    pathMatch: 'full',
  },
  {
    path: 'Clients/Edit/:id',
    component: AddClientComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Client.Update },
    pathMatch: 'full',
  },
  {
    path: 'Governorates',
    component: GovernateComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Governorate.Read },
    pathMatch: 'full',
  },
  {
    path: 'Governorate/Add',
    component: AddGovernarateComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Governorate.Create },
    pathMatch: 'full',
  },
  {
    path: 'Governorate/Edit/:code',
    component: AddGovernarateComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Governorate.Update },
    pathMatch: 'full',
  },
  {
    path: 'NotBaidBillList',
    component: NotpaidBillComponent,
  },
  {
    path: 'Packages',
    component: PackageComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Package.Read },
    pathMatch: 'full',
  },
  {
    path: 'Package/Add',
    component: AddPackageComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Package.Create },
    pathMatch: 'full',
  },
  {
    path: 'Package/Edit/:id',
    component: AddPackageComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Package.Update },
    pathMatch: 'full',
  },
  {
    path: 'Providers',
    component: ProviderComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Provider.Read },
    pathMatch: 'full',
  },
  {
    path: 'Provider/Add',
    component: AddProviderComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Provider.Create },
    pathMatch: 'full',
  },
  {
    path: 'Provider/Edit/:id',
    component: AddProviderComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Provider.Update },
  },
  {
    path: 'offers',
    component: OffersComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Offer.Read },
    pathMatch: 'full',
  },
  {
    path: 'Offers/Add',
    component: AddOfferComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Offer.Create },
    pathMatch: 'full',
  },
  {
    path: 'Offers/Edit/:id',
    component: AddOfferComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Offer.Update },
    pathMatch: 'full',
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Role.Read },
    pathMatch: 'full',
  },
  {
    path: 'role/add',
    component: AddRoleComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Role.Create },
    pathMatch: 'full',
  },
  {
    path: 'role/edit/:id',
    component: AddRoleComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Role.Update },
  },
  {
    path: 'Users',
    component: UserComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: User.Read },
  },
  {
    path: 'User/Add',
    component: AddUserComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: User.Create },
  },
  {
    path: 'User/Edit/:id',
    component: AddUserComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: User.Update },
  },
  {
    path: 'UnpaidBill',
    component: NotpaidBillComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Bill.Read },
  },
  { path: 'Login', component: LoginComponent, canActivate: [AlreadyLogged] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];
