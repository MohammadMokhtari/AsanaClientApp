import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { AppState } from './../../../../../store/app.reducer';
import { UserApplication } from '../../../../../modules/auth/models/ApplicationUser';
import * as fromAuthSelector from '../../../../../modules/auth/Store/auth.selector';

@Component({
  selector: 'app-top-header-user-area',
  templateUrl: './top-header-user-area.component.html',
  styleUrls: ['./top-header-user-area.component.scss'],
})
export class TopHeaderUserAreaComponent implements OnInit {
  isAuthenticated: Observable<boolean>;
  user: Observable<UserApplication | null>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(fromAuthSelector.isAuthenticated);
    this.user = this.store.select(fromAuthSelector.getUser);
  }
}
