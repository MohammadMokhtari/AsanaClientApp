import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

import { RefreshTokenRespnseModel } from './../modules/auth/models/refreshTokenResponseModel';
import { ResponseJsonStatus } from './../modules/shared/models/ResponseJsonStatus';
import { RefreshTokenRequestModel } from './../modules/auth/models/refreshTokenRequestModel';
import { StorageService } from '@shared-module/services/storage.service';
import * as fromAuthAction from '../modules/auth/Store/auth-actions';
import * as fromReminderAction from '../store/reminder/remnder.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private readonly store: Store
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401].includes(error.status)) {
          return this.handleRefreshToken(req, next);
        } else {
          this.store.dispatch(
            fromReminderAction.Reminder({
              message: 'ارتباط با سرور قطع شده است',
              reminderType: 'snackbar-notification--error',
              horizontalPosition: 'center',
              reminderDuration: 5000,
              verticalPosition: 'top',
            })
          );
          return throwError(error);
        }
      })
    );
  }

  addAccessTokenToHeader(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  private handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
    const user = this.storageService.readUser();
    if (!user) {
      this.store.dispatch(fromAuthAction.Reset());
      throw Error('TokenExpired!');
    }
    if (!user?.credential.accessToken) {
      this.store.dispatch(fromAuthAction.Reset());
      throw Error('TokenExpired!');
    }

    const refreshTokenReq = new RefreshTokenRequestModel(
      user.credential.accessToken,
      user.credential.refreshToken
    );

    return this.authService.refreshToken(refreshTokenReq).pipe(
      switchMap((response: ResponseJsonStatus<RefreshTokenRespnseModel>) => {
        this.authService.updateUserCredentialTokens(
          response.data.accessToken,
          response.data.refreshToken
        );

        this.store.dispatch(fromAuthAction.RefreshTokenSuccess());

        return next.handle(
          this.addAccessTokenToHeader(req, response.data.accessToken)
        );
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
