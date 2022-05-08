import { AppState } from 'src/app/store/app.reducer';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { UserLocationComponent } from './user-location/user-location.component';
import { Address } from '../../../../../modules/account/account-address/model/address.model';
import { Store } from '@ngrx/store';

import * as fromAuthSelector from '../../../../../modules/auth/Store/auth.selector';
import * as fromAddressSelector from '../../../../../modules/account/account-address/store/address.selector';
@Component({
  selector: 'app-site-option',
  templateUrl: './site-option.component.html',
  styleUrls: ['./site-option.component.scss'],
})
export class SiteOptionComponent implements OnInit, OnDestroy {
  constructor(private readonly store: Store<AppState>) {}

  private userSub: Subscription;
  private locationSub: Subscription;

  public isAuthenticated: Observable<boolean>;
  public defaultAddress: Observable<Address | null>;

  @ViewChild('userLocation') modal: UserLocationComponent;

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(fromAuthSelector.isAuthenticated);
    this.defaultAddress = this.store.select(fromAddressSelector.DefaultAddress);
  }

  openModal() {
    this.modal.openModal();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.locationSub?.unsubscribe();
  }
}
