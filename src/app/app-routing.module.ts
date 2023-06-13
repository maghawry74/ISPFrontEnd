import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovernateComponent } from './component/governate/governate.component';
import { AddGovernarateComponent } from './component/add-governarate/add-governarate.component';
import { LoginComponent } from './component/login/login.component';
import { AddOfferComponent } from './component/add-offer/add-offer.component';
import { ProviderComponent } from './component/provider/provider.component';
import { AddProviderComponent } from './component/add-provider/add-provider.component';

const routes: Routes = [
  { path: '', component: AddOfferComponent },
  { path: 'Governarates', component: GovernateComponent },
  { path: 'Governate/Add', component: AddGovernarateComponent },
  { path: 'Governate/Edit/:code', component: AddGovernarateComponent },
  {path:'Providers',component:ProviderComponent},
  {path:'Provider/Add',component: AddProviderComponent},
  {path:'Provider/Edit/:id',component: AddProviderComponent},
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
