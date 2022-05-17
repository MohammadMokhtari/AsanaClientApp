import { ProfileService } from '../../profile/services/profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileModel } from '../models/profile.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit, OnDestroy {
  constructor(public accountService: ProfileService) {}

  public isLoading: boolean = true;
  public account: ProfileModel | null;
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
