import { ProvinceService } from 'src/app/pages/layout/header/bottom-header/site-option/user-location/service/province.Service';
import { AccountAddressEditDialogComponent } from './account-address-edit/account-address-edit-dialog.component';
import { Address } from './../../../pages/layout/header/bottom-header/site-option/user-location/address.model';
import { AddressService } from 'src/app/pages/layout/header/bottom-header/site-option/user-location/service/address.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss'],
})
export class AccountAddressComponent implements OnInit, OnDestroy {
  constructor(
    private addressServce: AddressService,
    private provnceService: ProvinceService,
    public dialog: MatDialog
  ) {}

  isLoading: boolean = true;
  provinceSub: Subscription;

  private addressSub: Subscription;

  address: Address[] = [];

  ngOnInit(): void {
    this.provinceSub = this.provnceService.fetchProvinces().subscribe();
    this.addressSub = this.addressServce.fetchAddress().subscribe((data) => {
      this.address = data.data;
      this.isLoading = false;
    });

    this.addressServce.addressChanged.subscribe((data) => {
      this.address = data;
    });
  }

  openDialog() {
    this.dialog.open(AccountAddressEditDialogComponent, {
      height: '93vh',
    });
  }

  ngOnDestroy(): void {
    this.addressSub?.unsubscribe();
    this.provinceSub?.unsubscribe();
  }
}
