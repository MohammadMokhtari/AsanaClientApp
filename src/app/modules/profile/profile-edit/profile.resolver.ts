import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileResolver implements Resolve<ProfileModel | null> {
  constructor(private accountService: ProfileService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ProfileModel | Observable<ProfileModel | null> | Promise<ProfileModel> {
    let account: ProfileModel | null;
    return this.accountService.AccountSub;
  }
}
