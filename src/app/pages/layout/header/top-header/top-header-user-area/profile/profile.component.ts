import { Observable } from 'rxjs';
import { AppState } from './../../../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';

import { UserApplication } from '../../../../../../modules/auth/models/ApplicationUser';
import * as fromAuthAction from '../../../../../../modules/auth/Store/auth-actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() user: Observable<UserApplication | null>;
  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}

  onSignOut() {
    this.store.dispatch(fromAuthAction.LogOutStart());
  }

  onOpenAccessMenu() {}
}
