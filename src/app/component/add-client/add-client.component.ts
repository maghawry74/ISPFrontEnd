import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import IsNumberValidator from 'src/app/Validation/IsNumberValidator';
import { IProvider } from 'src/app/models/IOffer';
import { forkJoin } from 'rxjs'; // RxJS 6 syntax

import {
  IGovernarate,
  IGovernarateBranch,
  IGovernarateCentral,
} from 'src/app/models/igovernarate';
import { IProviderOffer, IProviderPackage } from 'src/app/models/iprovider';
import { AngularMateralService } from 'src/app/services/angular-materal.service';
import { ClientService } from 'src/app/services/client.service';
import { GovernorateService } from 'src/app/services/governorate.service';
import { ProviderService } from 'src/app/services/provider.service';
import { Select, initTE, Tab } from 'tw-elements';
import { IsUniqueSSN } from 'src/app/Validation/SSNValidator';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  ClientForm: FormGroup;
  state: 'Update' | 'Add' = 'Add';
  Providers: IProvider[] = [];
  Packages: IProviderPackage[] = [];
  Offers: IProviderOffer[] = [];
  Centrals: IGovernarateCentral[] = [];
  Branchs: IGovernarateBranch[] = [];
  Governorates: IGovernarate[] = [];
  constructor(
    fb: FormBuilder,
    private governorateService: GovernorateService,
    private providerervice: ProviderService,
    private clientService: ClientService,
    private ngService: AngularMateralService,
    private Activatedroutes: ActivatedRoute
  ) {
    const id = this.Activatedroutes.snapshot.params.id;
    if (id) {
      this.state = 'Update';
    }
    this.ClientForm = fb.group({
      Name: [
        { value: '', disabled: this.state == 'Update' },
        Validators.required,
      ],
      SSID: [
        { value: '', disabled: this.state == 'Update' },
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.minLength(14),
          IsNumberValidator,
        ],
        [IsUniqueSSN(this.clientService)],
      ],
      Email: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required, Validators.email],
      ],
      Tel: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required, IsNumberValidator],
      ],
      Phone: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required, IsNumberValidator],
      ],
      GovernorateCode: [
        { value: 0, disabled: this.state == 'Update' },
        [Validators.required],
      ],
      Address: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      OfferId: [{ value: 0, disabled: this.state == 'Update' }],
      ProviderId: [
        { value: 0, disabled: this.state == 'Update' },
        [Validators.required],
      ],
      PackageId: [{ value: '' }, [Validators.required]],
      CentralId: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      BranchId: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      UserName: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      Password: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      PortSlot: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      Slot: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      PortBlock: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      Block: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      VCI: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      VPI: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      OperationOrderNumber: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      OperationOrderDate: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      PrePaid: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      InstallationFee: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      ContractFee: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      PackageIp: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      OrderNumber: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
      RouterSerial: [
        { value: '', disabled: this.state == 'Update' },
        [Validators.required],
      ],
    });

    this.ClientForm.get('ProviderId')?.valueChanges.subscribe((data) => {
      if (data == 0) {
        return;
      }
      this.providerervice
        .GetProviderOffersAndPackages(data)
        .subscribe((OffersAndPackages) => {
          this.Offers = OffersAndPackages.offers;
          this.Packages = OffersAndPackages.packages;
        });
    });

    this.ClientForm.get('GovernorateCode')?.valueChanges.subscribe((data) => {
      if (data == 0) {
        return;
      }
      this.governorateService
        .GetGovernorateBranchesAndCentrals(data)
        .subscribe((Gov) => {
          this.Branchs = Gov.branches;
          this.Centrals = Gov.centrals;
        });
    });
  }
  ngOnInit(): void {
    initTE({ Select, Tab });
    forkJoin([
      this.providerervice.GetAll(),
      this.governorateService.GetAll(),
    ]).subscribe({
      next: (Data) => {
        this.Providers = Data[0];
        this.Governorates = Data[1];
      },
      error: (e) => console.log(e),
    });

    const id = this.Activatedroutes.snapshot.params.id;
    if (id) {
      this.clientService.GetById(id).subscribe((data) => {
        console.log(data);
        this.ClientForm.setValue({
          Name: data.name,
          SSID: data.ssid,
          Email: data.email,
          Tel: data.tel,
          Phone: data.phone,
          GovernorateCode: data.governorate.code,
          Address: data.address,
          OfferId: data.offer?.id ?? '',
          ProviderId: data.provider?.id,
          PackageId: data.package?.id,
          CentralId: data.central?.id,
          BranchId: data.branch?.id,
          UserName: data.userName,
          Password: data.password,
          PortSlot: data.portSlot,
          Slot: data.slot,
          PortBlock: data.portBlock,
          Block: data.block,
          VCI: data.vci,
          VPI: data.vpi,
          OperationOrderNumber: data.operationOrderNumber,
          OperationOrderDate: data.operationOrderDate,
          PrePaid: data.prePaid,
          InstallationFee: data.installationFee,
          ContractFee: data.contractFee,
          PackageIp: data.packageIp,
          OrderNumber: data.orderNumber,
          RouterSerial: data.routerSerial,
        });
      });
    }
  }

  FormHandler() {
    if (this.state == 'Add') {
      this.clientService
        .Add({
          ...this.ClientForm.value,
          OrderNumber: String(this.ClientForm.get('OrderNumber')?.value),
        })
        .subscribe({
          next: () => {
            this.ngService.addAndUpdateSuccess(
              'Client Has Been Added Successfully'
            );
          },
          error: (e) => {
            console.log(e);
            this.ngService.addAndUpdateSuccess(
              'An Error Has Ocurred, Try Again Later.'
            );
          },
        });
    } else {
      const id = this.ClientForm.get('SSID')?.value!;
      const PackageId = this.ClientForm.get('PackageId')?.value!;
      this.clientService.Update(id, { SSID: id, PackageId }).subscribe({
        next: () => {
          this.ngService.addAndUpdateSuccess(
            'Client Has Been Updated Successfully'
          );
        },
        error: (e) => {
          console.log(e);
          this.ngService.addAndUpdateSuccess(
            'An Error Has Ocurred, Try Again Later.'
          );
        },
      });
    }
  }
}
