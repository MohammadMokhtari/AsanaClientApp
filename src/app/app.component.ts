import { AddressService } from 'src/app/pages/layout/header/bottom-header/site-option/user-location/service/address.service';
import { AuthService } from './modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.addressService.autoSetDefaultAddress();
  }
}
