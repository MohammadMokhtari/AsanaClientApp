import { AppState } from 'src/app/store/app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuthAction from './modules/auth/Store/auth-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(fromAuthAction.AutoLogin());
  }
}
