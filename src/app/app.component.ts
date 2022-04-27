import { AuthService } from './modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AddressServices } from './modules/account/account-address/services/address.service';

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
