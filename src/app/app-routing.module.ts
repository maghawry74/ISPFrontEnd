import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovernateComponent } from './component/governate/governate.component';
import { AddGovernarateComponent } from './component/add-governarate/add-governarate.component';

const routes: Routes = [
  {path: 'Governarates', component:GovernateComponent},
  {path:'Governate/Add', component:AddGovernarateComponent},
  {path:'Governate/Edit/:code',component:AddGovernarateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
