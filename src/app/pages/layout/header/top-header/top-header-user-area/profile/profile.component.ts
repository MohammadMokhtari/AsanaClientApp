import { Component, OnInit, Input } from '@angular/core';

import { User } from './../../../../../../modules/auth/models/user';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  constructor(private aurtService: AuthService) {}

  ngOnInit(): void {}

  onSignOut() {
    this.aurtService.signOutUser();
  }

  onOpenAccessMenu() {}
}
