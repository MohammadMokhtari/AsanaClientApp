import { AppState } from './../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { ProvinceService } from 'src/app/modules/account/account-address/services/province.Service';
import { AccountAddressEditDialogComponent } from './account-address-edit/account-address-edit-dialog.component';
import { Address } from './model/address.model';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import * as fromAddressSelector from './store/address.selector';
import * as fromAddressAction from './store/address.action';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss'],
})
export class AccountAddressComponent implements OnInit {
  constructor(
    private provnceService: ProvinceService,
    public dialog: MatDialog,
    private readonly store: Store<AppState>
  ) {}

  isLoading$: Observable<boolean>;
  provinceSub: Subscription;

  address$: Observable<Address[] | null>;

  ngOnInit(): void {
    this.store.dispatch(fromAddressAction.GetAddressesStart());

    this.provinceSub = this.provnceService.fetchProvinces().subscribe();

    this.isLoading$ = this.store.select(fromAddressSelector.isLoading);

    this.address$ = this.store.select(fromAddressSelector.Addresses);
  }

  openDialog() {
    this.dialog.open(AccountAddressEditDialogComponent, {
      height: '93vh',
    });
  }
}
