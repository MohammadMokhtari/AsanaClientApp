import { routeAnimation } from '../../animations/routeAnimation';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../auth/models/user';
import { AuthService } from '../auth/services/auth.service';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [routeAnimation],
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: ProfileService,
    private authService: AuthService
  ) {}

  private userSub: Subscription;
  private accountSub: Subscription;

  public User: User;

  ngOnInit(): void {
    this.accountSub = this.accountService.GetUserInfo().subscribe();
    this.userSub = this.authService.CurrentUser.subscribe((user) => {
      this.User = user!;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.accountSub.unsubscribe();
  }
}
