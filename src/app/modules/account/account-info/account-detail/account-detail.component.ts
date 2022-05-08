import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';

import { UserProfile } from '../../models/UserProfile';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent {
  constructor() {}

  @Input() userProfile$: Observable<UserProfile | null>;
}
