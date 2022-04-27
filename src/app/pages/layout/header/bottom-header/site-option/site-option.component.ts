import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserLocationComponent } from './user-location/user-location.component';
import { Address } from '../../../../../modules/account/account-address/model/address.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AddressServices } from 'src/app/modules/account/account-address/services/address.service';

@Component({
  selector: 'app-site-option',
  templateUrl: './site-option.component.html',
  styleUrls: ['./site-option.component.scss'],
})
export class SiteOptionComponent implements OnInit, OnDestroy {
  constructor(
    private addressService: AddressServices,
    private authService: AuthService
  ) {}

  private userSub: Subscription;
  private locationSub: Subscription;

  public isAuthenticated: boolean = false;
  public DefaultLocation: Address | null;

  @ViewChild('userLocation') modal: UserLocationComponent;

  ngOnInit(): void {
    this.userSub = this.authService.CurrentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.locationSub = this.addressService.defaultAddress.subscribe(
          (location) => {
            this.DefaultLocation = location;
          }
        );
      }
    });
  }

  openModal() {
    this.modal.openModal();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.locationSub?.unsubscribe();
  }
}
