import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-acceess-menu',
  templateUrl: './profile-acceess-menu.component.html',
  styleUrls: ['./profile-acceess-menu.component.scss'],
})
export class ProfileAcceessMenuComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  signOut() {
    this.authService.signOutUser();
  }
}
