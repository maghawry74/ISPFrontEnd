import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { ModalComponent } from './component/modal/modal.component';
import { PackageComponent } from './component/package/package.component';
import { AddPackageComponent } from './component/add-package/add-package.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Centrals', component: CentralsComponent },
  { path: 'Centrals/Add', component: AddCentralComponent },
  { path: 'Centrals/Edit/:id', component: AddCentralComponent },
  { path: 'Governarates', component: GovernateComponent },
  { path: 'Governate/Add', component: AddGovernarateComponent },
  { path: 'Governate/Edit/:code', component: AddGovernarateComponent },
  {path:'Packages', component:PackageComponent},
  {path:'Package/Add', component:AddPackageComponent},
  {path:'Package/Edit/:id',component:AddPackageComponent},
  {path:'Providers',component:ProviderComponent},
  {path:'Provider/Add',component: AddProviderComponent},
  {path:'Provider/Edit/:id',component: AddProviderComponent},
  { path: 'offers', component: OffersComponent },
  { path: 'Offers/Add', component: AddOfferComponent },
  { path: 'Offers/Edit/:id', component: AddOfferComponent },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
