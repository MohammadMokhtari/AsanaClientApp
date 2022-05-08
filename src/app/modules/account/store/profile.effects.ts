import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import * as fromProfileAction from './profile.action';
import * as fromAuthAction from '../../auth/Store/auth-actions';
import * as fromReminderAction from '../../../store/reminder/remnder.actions';

@Injectable()
export class ProfileEffect {
  constructor(
    private readonly actions$: Actions,
    private profileService: ProfileService,
    private readonly route: Router
  ) {}

  profileInfoStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileAction.PROFILE_INFO_START),
      exhaustMap((_) => {
        return this.profileService
          .GetUserInfo()
          .pipe(
            map((response) =>
              fromProfileAction.ProfileInfoSuccess(response.data)
            )
          );
      })
    )
  );

  profileUpdateStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileAction.PROFILE_UPDATE_START),
      exhaustMap((actionPayload) => {
        return this.profileService.UpdateAccount(actionPayload).pipe(
          map(() => fromProfileAction.ProfileUpdateSuccess(actionPayload)),
          catchError((errorMeessage: string) =>
            of(
              fromProfileAction.ProfileUpdateFailed({
                errorMessage: errorMeessage,
              })
            )
          )
        );
      })
    )
  );

  profileUpdateSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileAction.PROFILE_UPDATE_SUCCESS),
      exhaustMap((actionPayload) => {
        this.route.navigate(['account']);
        return of(fromAuthAction.UpdateAuthUser(actionPayload));
      })
    )
  );

  profileUpdateSuccessReminder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileAction.PROFILE_UPDATE_SUCCESS),
      map((_) =>
        fromReminderAction.Reminder({
          message: 'حساب کاربری با موفقیت به روز شد',
          reminderType: 'snackbar-notification--info',
          horizontalPosition: 'end',
          verticalPosition: 'top',
          reminderDuration: 4000,
        })
      )
    )
  );

  profileUpdateFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromProfileAction.ProfileUpdateFailed),
      map((actionPayload) =>
        fromReminderAction.Reminder({
          message: actionPayload.errorMessage,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          reminderDuration: 4000,
          reminderType: 'snackbar-notification--error',
        })
      )
    )
  );
}
