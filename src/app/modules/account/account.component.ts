import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from './../auth/models/user';
import { AuthService } from './../auth/services/auth.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
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
