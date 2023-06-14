import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GovernateComponent } from './component/governate/governate.component';
import { AddGovernarateComponent } from './component/add-governarate/add-governarate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './component/login/login.component';
import { AddOfferComponent } from './component/add-offer/add-offer.component';
import { InputComponent } from './component/input/input.component';
import { ProviderComponent } from './component/provider/provider.component';
import { AddProviderComponent } from './component/add-provider/add-provider.component';
import { MatConfirmDialogComponent } from './component/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { AddCentralComponent } from './component/add-central/add-central.component';
import { AddBranchComponent } from './component/add-branch/add-branch.component';
import { CentralsComponent } from './component/centrals/centrals.component';
import { ModalComponent } from './component/modal/modal.component';
import { OffersComponent } from './component/offers/offers.component';
import { PackageComponent } from './component/package/package.component';
import { AddPackageComponent } from './component/add-package/add-package.component';
import { BranchsComponent } from './component/branchs/branchs.component';
@NgModule({
  declarations: [
    AppComponent,
    GovernateComponent,
    AddGovernarateComponent,
    LoginComponent,
    AddOfferComponent,
    InputComponent,
    ProviderComponent,
    AddProviderComponent,
    MatConfirmDialogComponent,
    AddCentralComponent,
    AddBranchComponent,
    CentralsComponent,
    ModalComponent,
    OffersComponent,
    PackageComponent,
    AddPackageComponent,
    BranchsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  //entryComponents:[MatConfirmDialogComponent]
})
export class AppModule { }
