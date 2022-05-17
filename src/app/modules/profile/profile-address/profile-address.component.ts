import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ProfileAddressEditDialogComponent } from './profile-address-edit/profile-address-edit-dialog.component';
import { AddressServices } from './services/address.service';
import { ProvinceService } from './services/province.Service';
import { Address } from './model/address.model';

@Component({
  selector: 'app-account-address',
  templateUrl: './profile-address.component.html',
  styleUrls: ['./profile-address.component.scss'],
})
export class ProfileAddressComponent implements OnInit, OnDestroy {
  constructor(
    private addressService: AddressServices,
    private provnceService: ProvinceService,
    public dialog: MatDialog
  ) {}

  isLoading: boolean = true;
  provinceSub: Subscription;
  addressChangeSub: Subscription;

  private addressSub: Subscription;

  addresses: Address[] = [];

  ngOnInit(): void {
    this.provinceSub = this.provnceService.fetchProvinces().subscribe();

    this.addressSub = this.addressService.getAddresses().subscribe((_) => {
      this.isLoading = false;
      this.addresses = this.addressService.AllAddresses();
    });

    this.addressChangeSub = this.addressService.addressesChanged.subscribe(
      (data) => {
        this.addresses = data;
      }
    );
  }

  openDialog() {
    this.dialog.open(ProfileAddressEditDialogComponent, {
      height: '93vh',
    });
  }

  ngOnDestroy(): void {
    this.addressSub?.unsubscribe();
    this.provinceSub?.unsubscribe();
    this.addressChangeSub?.unsubscribe();
  }
}
