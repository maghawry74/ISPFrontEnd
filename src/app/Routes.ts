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
import { Routes } from '@angular/router';
import {
  Branch,
  Central,
  Governorate,
  Offer,
  Package,
  Provider,
  Role,
} from './models/Permission';
export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoggedIn] },
  {
    path: 'branch',
    component: BranchsComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Branch.Read },
  },
  {
    path: 'branch/add',
    component: AddBranchComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Branch.Create },
  },
  {
    path: 'branch/edit/:id',
    component: AddBranchComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Branch.Update },
  },
  {
    path: 'Centrals',
    component: CentralsComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Central.Read },
  },
  {
    path: 'Centrals/Add',
    component: AddCentralComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Central.Create },
  },
  {
    path: 'Centrals/Edit/:id',
    component: AddCentralComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Central.Update },
  },
  {
    path: 'Governorates',
    component: GovernateComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Governorate.Read },
  },
  {
    path: 'Governorate/Add',
    component: AddGovernarateComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Governorate.Create },
  },
  {
    path: 'Governorate/Edit/:code',
    component: AddGovernarateComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Governorate.Update },
  },
  {
    path: 'Packages',
    component: PackageComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Package.Read },
  },
  {
    path: 'Package/Add',
    component: AddPackageComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Package.Create },
  },
  {
    path: 'Package/Edit/:id',
    component: AddPackageComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Package.Update },
  },
  {
    path: 'Providers',
    component: ProviderComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Provider.Read },
  },
  {
    path: 'Provider/Add',
    component: AddProviderComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Provider.Create },
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
  },
  {
    path: 'Offers/Add',
    component: AddOfferComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Offer.Create },
  },
  {
    path: 'Offers/Edit/:id',
    component: AddOfferComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Offer.Update },
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Role.Read },
  },
  {
    path: 'role/add',
    component: AddRoleComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Role.Create },
  },
  {
    path: 'role/edit/:id',
    component: AddRoleComponent,
    canActivate: [LoggedIn, HasPermission],
    data: { Permission: Role.Update },
  },
  { path: 'Login', component: LoginComponent, canActivate: [AlreadyLogged] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];
