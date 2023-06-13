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
import { AddCentralComponent } from './component/add-central/add-central.component';
import { AddBranchComponent } from './component/add-branch/add-branch.component';
import { CentralsComponent } from './component/centrals/centrals.component';
import { ModalComponent } from './component/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GovernateComponent,
    AddGovernarateComponent,
    LoginComponent,
    AddOfferComponent,
    InputComponent,
    AddCentralComponent,
    AddBranchComponent,
    CentralsComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
