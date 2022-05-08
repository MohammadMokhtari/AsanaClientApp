import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { AppState } from 'src/app/store/app.reducer';
import * as fromAuthAction from '../../auth/Store/auth-actions';
@Component({
  selector: 'app-account-acceess-menu',
  templateUrl: './account-acceess-menu.component.html',
  styleUrls: ['./account-acceess-menu.component.scss'],
})
export class AccountAcceessMenuComponent implements OnInit {
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}
  signOut() {
    this.store.dispatch(fromAuthAction.LogOutStart());
  }
}
