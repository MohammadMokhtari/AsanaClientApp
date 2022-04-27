import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountModel } from '../models/account.model';

import { AccountService } from '../services/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit, OnDestroy {
  constructor(public accountService: AccountService) {}

  public isLoading: boolean = true;
  public account: AccountModel | null;
  private accountSub: Subscription;

  ngOnInit(): void {
    this.isLoading = !!this.account;
    this.accountSub = this.accountService.AccountSub.subscribe((data) => {
      this.account = data;
      this.isLoading = !!this.account;
    });
  }

  ngOnDestroy(): void {
    this.accountSub.unsubscribe();
  }
}
