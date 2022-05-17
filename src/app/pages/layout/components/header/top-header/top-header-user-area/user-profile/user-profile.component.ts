import { Component, OnInit, Input } from '@angular/core';

import { User } from '@auth-module/models/user';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input() user: User;
  constructor(private aurtService: AuthService) {}

  ngOnInit(): void {}

  onSignOut() {
    this.aurtService.signOutUser();
  }

  onOpenAccessMenu() {}
}
