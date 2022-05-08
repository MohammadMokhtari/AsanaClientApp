import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { StorageService } from './../../shared/services/storage.service';
import { AppState } from 'src/app/store/app.reducer';
import { AuthService } from '../services/auth.service';
import { LoginModel } from '../models/loginModel';
import { LoginResponse } from './../models/loginResponse';
import * as fromAuthAction from '../Store/auth-actions';
import * as fromAuthSelector from '../Store/auth.selector';
import * as fromReminderAction from '../../../store/reminder/remnder.actions';
import * as fromAddressAction from '../../account/account-address/store/address.action';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly action$: Actions,
    private readonly store: Store<AppState>,
    private authService: AuthService,
    private route: Router,
    private storageService: StorageService
  ) {}

  loginStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.LOGIN_START),
      exhaustMap((actionPayload: LoginModel) => {
        return this.authService.loginUser(actionPayload).pipe(
          map((response) => {
            return fromAuthAction.AuthenticateConfirmation(response.data);
          }),
          catchError((errorMessage: string) => {
            return of(
              fromAuthAction.AuthenticateFailed({ errorMessage: errorMessage })
            );
          })
        );
      })
    )
  );

  authenticateConfirmation$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.AUTHENTICATE_CONFIRMATION),
      exhaustMap((actionPayload: LoginResponse) => {
        const user = this.authService.mapToUserApplication(actionPayload.user);
        this.storageService.writeUser(user);
        return of(
          fromAuthAction.AuthenticateSuccess({
            user: user,
          })
        );
      })
    )
  );

  authenticateConfirmation$$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.AUTHENTICATE_CONFIRMATION),
      exhaustMap((actionPayload: LoginResponse) => {
        return of(
          fromAddressAction.SetDefaultAddressSuccess(
            actionPayload.defaultAddress
          )
        );
      })
    )
  );

  authenticateSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.AUTHENTICATE_SUCCESS),
      map((_) => {
        return fromReminderAction.Reminder({
          message: 'ورود شما موفقیت آمیز بود',
          reminderType: 'snackbar-notification--success',
          reminderDuration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
    )
  );

  authenticateFailed$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.AUTHENTICATE_FAILED),
      map((patload: { errorMessage: string }) => {
        return fromReminderAction.Reminder({
          message: patload.errorMessage,
          reminderType: 'snackbar-notification--error',
          reminderDuration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      })
    )
  );

  redirectAuthenticate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          fromAuthAction.AUTHENTICATE_SUCCESS,
          fromAuthAction.LOGOUT_SUCCESS
        ),
        tap((_) => {
          this.route.navigate(['/']);
        })
      ),
    {
      dispatch: false,
    }
  );

  logoutStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.LOGOUT_START),
      withLatestFrom(this.store.select(fromAuthSelector.getRefreshToken)),
      exhaustMap(([_, refreshToken]) => {
        if (refreshToken) {
          return this.authService.revokeToken(refreshToken).pipe(
            map((_) => {
              this.storageService.clearStorage();
              return fromAuthAction.LogOutSuccess();
            }),
            catchError(() => {
              return of(fromAuthAction.LogoutDismiss());
            })
          );
        }
        return of(fromAuthAction.LogoutDismiss());
      })
    )
  );

  logoutRedirect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAuthAction.LOGOUT_SUCCESS),
        tap(() => {
          this.route.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  refreshTokenStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.REFRESH_TOKEN_START),
      exhaustMap(
        (actionPayload: { accessToken: string; refreshToken: string }) => {
          return this.authService.refreshToken(actionPayload).pipe(
            map((response) => {
              this.authService.updateUserCredentialTokens(
                response.data.accessToken,
                response.data.refreshToken
              );
              return fromAuthAction.RefreshTokenSuccess();
            }),
            catchError((_) => {
              return of(fromAuthAction.LogOutStart());
            })
          );
        }
      )
    )
  );

  refreshTokenSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.REFRESH_TOKEN_SUCCESS),
      map((_) => {
        const user = this.storageService.readUser();
        const defaultAddress = this.storageService.readDefaultAddress();
        if (user && defaultAddress) {
          return fromAuthAction.Authentication({
            user: user,
            defaultAddress: defaultAddress,
          });
        }
        return fromAuthAction.LogOutStart();
      })
    )
  );

  authLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.AUTO_LOGIN),
      exhaustMap((_) => {
        const user = this.storageService.readUser();
        const defaultAddress = this.storageService.readDefaultAddress();

        if (user && defaultAddress) {
          if (
            this.authService.validationTokenExpired(user.credential.accessToken)
          ) {
            return of(
              fromAuthAction.RefreshTokenStart({
                accessToken: user.credential.accessToken,
                refreshToken: user.credential.refreshToken,
              })
            );
          }
          return of(
            fromAuthAction.Authentication({
              user: user,
              defaultAddress: defaultAddress,
            })
          );
        }
        return of(fromAuthAction.LogOutStart());
      })
    )
  );

  authentication$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAuthAction.Authentication),
      map((actionPayload) => {
        return fromAddressAction.SetDefaultAddressSuccess(
          actionPayload.defaultAddress
        );
      })
    )
  );
}
