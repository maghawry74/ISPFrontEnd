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
import { AddRoleComponent } from './component/add-role/add-role.component';
import { RolesComponent } from './component/roles/roles.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EntityChecksComponent } from './component/entity-checks/entity-checks.component';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomeComponent } from './component/home/home.component';
import { ClientsComponent } from './component/clients/clients.component';
import { AddClientComponent } from './component/add-client/add-client.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ClientDetailsComponent } from './component/client-details/client-details.component';
import { DetailInfoComponent } from './component/detail-info/detail-info.component';
import { UserComponent } from './component/user/user.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { CardComponent } from './component/card/card.component';
import { NotpaidBillComponent } from './component/notpaid-bill/notpaid-bill.component';
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
    BranchsComponent,
    AddRoleComponent,
    RolesComponent,
    EntityChecksComponent,
    ForbiddenComponent,
    NotFoundComponent,
    HomeComponent,
    ClientsComponent,
    AddClientComponent,
    ClientDetailsComponent,
    DetailInfoComponent,
    UserComponent,
    AddUserComponent,
    SideNavComponent,
    CardComponent,
    NotpaidBillComponent,
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
    MatIconModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
