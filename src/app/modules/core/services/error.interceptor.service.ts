import { RefreshTokenRespnseModel } from '../../auth/models/refreshTokenResponseModel';
import { ResponseJsonStatus } from '../../shared/models/ResponseJsonStatus';
import { RefreshTokenRequestModel } from '../../auth/models/refreshTokenRequestModel';
import { StorageService } from '@shared-module/services/storage.service';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401, 403].includes(error.status)) {
          return this.handleRefreshToken(req, next);
        } else {
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
      this.authService.signOutUser();
      throw Error('TokenExpired!');
    }
    if (!user?.token) {
      this.authService.signOutUser();
      throw Error('TokenExpired!');
    }

    const refreshTokenReq = new RefreshTokenRequestModel(
      user.token,
      user.refreshToken
    );
    return this.authService.refreshToken(refreshTokenReq).pipe(
      switchMap((response: ResponseJsonStatus<RefreshTokenRespnseModel>) => {
        this.authService.updateUserCredential(
          response.data.accessToken,
          response.data.refreshToken
        );
        return next.handle(
          this.addAccessTokenToHeader(req, response.data.accessToken)
        );
      }),
      catchError((error) => {
        this.authService.signOutUser();
        return throwError(error);
      })
    );
  }
}
