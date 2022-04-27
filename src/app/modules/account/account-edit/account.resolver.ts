import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountModel } from '../models/account.model';
import { AccountService } from '../services/account.service';

@Injectable()
export class AccountResolver implements Resolve<AccountModel | null> {
  constructor(private accountService: AccountService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): AccountModel | Observable<AccountModel | null> | Promise<AccountModel> {
    let account: AccountModel | null;
    return this.accountService.AccountSub;
  }
}
