import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { routeAnimation } from './../../animations/routeAnimation';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { UserApplication } from '../auth/models/ApplicationUser';
import * as fromAuthSelector from '../auth/Store/auth.selector';
import * as fromProfileAction from './store/profile.action';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [routeAnimation],
})
export class AccountComponent implements OnInit, OnDestroy {
  constructor(private readonly store: Store<AppState>) {}

  public User$: Observable<UserApplication | null>;

  ngOnInit(): void {
    this.store.dispatch(fromProfileAction.ProfileInfoStart());
    this.User$ = this.store.select(fromAuthSelector.getUser);
  }

  ngOnDestroy(): void {}
}
