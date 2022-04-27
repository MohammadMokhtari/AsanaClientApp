import { environment } from './../../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { AccountModel } from '../../models/account.model';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {
  constructor() {}

  @Input() Account: AccountModel | null;

  ngOnInit(): void {}
}
