import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-acceess-menu',
  templateUrl: './account-acceess-menu.component.html',
  styleUrls: ['./account-acceess-menu.component.scss'],
})
export class AccountAcceessMenuComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  signOut() {
    this.authService.signOutUser();
  }
}
