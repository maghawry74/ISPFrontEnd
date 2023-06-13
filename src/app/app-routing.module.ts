import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovernateComponent } from './component/governate/governate.component';
import { AddGovernarateComponent } from './component/add-governarate/add-governarate.component';
import { LoginComponent } from './component/login/login.component';
import { AddOfferComponent } from './component/add-offer/add-offer.component';
import { AddCentralComponent } from './component/add-central/add-central.component';
import { AddBranchComponent } from './component/add-branch/add-branch.component';
import { CentralsComponent } from './component/centrals/centrals.component';
import { ModalComponent } from './component/modal/modal.component';

const routes: Routes = [
  { path: '', component: ModalComponent },
  { path: 'Centrals', component: CentralsComponent },
  { path: 'Centrals/Add', component: AddCentralComponent },
  { path: 'Centrals/Edit/:id', component: AddCentralComponent },
  { path: 'Governarates', component: GovernateComponent },
  { path: 'Governate/Add', component: AddGovernarateComponent },
  { path: 'Governate/Edit/:code', component: AddGovernarateComponent },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
