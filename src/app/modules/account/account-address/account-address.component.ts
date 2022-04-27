import { ProvinceService } from 'src/app/modules/account/account-address/services/province.Service';
import { AccountAddressEditDialogComponent } from './account-address-edit/account-address-edit-dialog.component';
import { Address } from './model/address.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddressServices } from './services/address.service';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss'],
})
export class AccountAddressComponent implements OnInit, OnDestroy {
  constructor(
    private addressService: AddressServices,
    private provnceService: ProvinceService,
    public dialog: MatDialog
  ) {}

  isLoading: boolean = true;
  provinceSub: Subscription;
  addressChangeSub: Subscription;

  private addressSub: Subscription;

  address: Address[] = [];

  ngOnInit(): void {
    this.provinceSub = this.provnceService.fetchProvinces().subscribe();

    this.addressSub = this.addressService.getAddresses().subscribe((_) => {
      this.isLoading = false;
      this.address = this.addressService.AllAddresses();
    });

    this.addressChangeSub = this.addressService.addressesChanged.subscribe(
      (data) => {
        this.address = data;
      }
    );
  }

  openDialog() {
    this.dialog.open(AccountAddressEditDialogComponent, {
      height: '93vh',
    });
  }

  ngOnDestroy(): void {
    this.addressSub?.unsubscribe();
    this.provinceSub?.unsubscribe();
    this.addressChangeSub?.unsubscribe();
  }
}
