import { Component, OnInit } from '@angular/core';

import { AuthService } from './modules/auth/services/auth.service';
import { AddressServices } from './modules/profile/profile-address/services/address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private addressService: AddressServices
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.addressService.autoSetDefaultAddress();
  }
}
