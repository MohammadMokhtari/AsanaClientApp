import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { UserProfile } from '../models/UserProfile';
import { AppState } from 'src/app/store/app.reducer';
import * as fromProfileSelector from '../store/profile.selector';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {
  constructor(public readonly store: Store<AppState>) {}

  public isLoading$: Observable<boolean>;

  public profile$: Observable<UserProfile | null>;

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromProfileSelector.isLoading);
    this.profile$ = this.store.select(fromProfileSelector.userProfile);
  }
}
