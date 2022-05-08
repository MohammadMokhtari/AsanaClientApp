import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/UserProfile';
import { AccountService } from '../services/profile.service';

@Injectable()
export class AccountResolver implements Resolve<UserProfile | null> {
  constructor(private accountService: AccountService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UserProfile | Observable<UserProfile | null> | Promise<UserProfile> {
    let account: UserProfile | null;
    return this.accountService.AccountSub;
  }
}
