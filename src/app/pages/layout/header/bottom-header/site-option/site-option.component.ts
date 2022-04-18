import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AddressService } from './user-location/service/address.service';
import { UserLocationComponent } from './user-location/user-location.component';
import { Address } from './user-location/address.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-site-option',
  templateUrl: './site-option.component.html',
  styleUrls: ['./site-option.component.scss'],
})
export class SiteOptionComponent implements OnInit, OnDestroy {
  constructor(
    private addressService: AddressService,
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
    // this.userSub?.unsubscribe();
    // this.locationSub?.unsubscribe();
  }
}
