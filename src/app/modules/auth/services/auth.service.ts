import { UserCredential } from './../models/ApplicationUser';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { UserApplication } from '../models/ApplicationUser';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { LoginResponse } from '../models/loginResponse';
import { StorageService } from '@shared-module/services/storage.service';
import { ResetPasswordModel } from './../models/resetPasswordModel';
import { ForgotPasswordModel } from './../models/forgotPasswordModel';
import { ResponseJsonStatus } from '../../shared/models/ResponseJsonStatus';
import { RefreshTokenRequestModel } from './../models/refreshTokenRequestModel';
import { RefreshTokenRespnseModel } from './../models/refreshTokenResponseModel';
import { UserLoginResponseModel } from './../models/userLoginResponseModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private Http: HttpClient,
    private route: Router,
    private storageService: StorageService
  ) {
    this._jwtHelper = new JwtHelperService();
  }

  public CurrentUser = new BehaviorSubject<UserApplication | null>(null);

  private _jwtHelper: JwtHelperService;

  public registerUser(
    register: RegisterModel
  ): Observable<ResponseJsonStatus<any>> {
    return this.Http.post<ResponseJsonStatus<any>>(
      `auth/register`,
      register
    ).pipe(catchError(this.handleError));
  }

  public loginUser(
    loginModel: LoginModel
  ): Observable<ResponseJsonStatus<LoginResponse>> {
    return this.Http.post<ResponseJsonStatus<LoginResponse>>(
      `auth/login`,
      loginModel
    ).pipe(catchError(this.handleError));
  }

  public refreshToken(refreshTokenMdodel: RefreshTokenRequestModel) {
    return this.Http.post<ResponseJsonStatus<RefreshTokenRespnseModel>>(
      'auth/refresh',
      refreshTokenMdodel
    );
  }

  public revokeToken(refreshToken: string): Observable<any> {
    return this.Http.post('auth/revokeToken', {
      refreshToken: refreshToken,
    });
  }

  public validationTokenExpired(accessToken: string): boolean {
    return this._jwtHelper.isTokenExpired(accessToken);
  }

  public forgotPassword(forgotModel: ForgotPasswordModel) {
    return this.Http.post('auth/forgotPassword', forgotModel).pipe(
      catchError(this.handleError),
      tap((_) => {
        this.route.navigate(['/']);
      })
    );
  }

  public resetPassword(resetPassword: ResetPasswordModel) {
    return this.Http.post('auth/resetPassword', resetPassword);
  }

  public ConfirmEmail(token: string, userId: string) {
    let authParams = new HttpParams();
    authParams = authParams.append('token', token);
    authParams = authParams.append('userId', userId);

    return this.Http.get('auth/confirmEmail', {
      params: authParams,
    });
  }

  public setCurrentUser(user: UserApplication): void {
    this.CurrentUser.next(user);
  }

  public updateCurrentUser(
    photoUrl: string,
    firstName?: string,
    lastName?: string,
    mobile?: string
  ) {
    const user = this.storageService.readUser();
    if (user) {
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.mobile = mobile ?? user.mobile;
      user.photoUrl = photoUrl;

      this.CurrentUser.next(user);
      this.storageService.writeUser(user);
    }
  }

  updateUserCredentialTokens(accessToken: string, refreshToken: string) {
    const user = this.storageService.readUser();
    if (user) {
      user.credential.accessToken = accessToken;
      user.credential.refreshToken = refreshToken;
      this.storageService.writeUser(user);
    }
  }

  public updateUserPhoto(photoUrl: string): void {
    this.updateCurrentUser(photoUrl);
  }

  public mapToUserApplication(
    responseModel: UserLoginResponseModel
  ): UserApplication {
    const expirationDate = new Date(
      new Date().getTime() + responseModel.tokenExpiresIn * 1000
    );
    const userCredential: UserCredential = new UserCredential(
      responseModel.token,
      responseModel.refreshToken,
      expirationDate
    );
    const user = new UserApplication(
      responseModel.userId,
      responseModel.email,
      responseModel.userName,
      responseModel.photoUrl,
      responseModel.walletBalance,
      responseModel.score,
      responseModel.mobile,
      responseModel.firstName,
      responseModel.lastName,
      responseModel.fullName,
      userCredential
    );
    return user;
  }

  public handleError(errorRes: HttpErrorResponse) {
    let errroMessage = 'خطایی رخ داده لطفا بعدا دوباره تلاش کنید !';

    if (!errorRes.error || !errorRes.error.errors) {
      return throwError(errroMessage);
    }
    switch (errorRes.error.errors[0]) {
      case 'USER_NOT_FOUND':
        errroMessage = 'کاربری با مشخصات وارد شده یافت نشد!';
        break;

      case 'INVALID_PASSWORD':
        errroMessage = 'کلمه عبور صحیح نمی باشد!';
        break;

      case 'USER_NOT_ACTIVE':
        errroMessage = 'حساب کاربری شما فعال نمی باشد!';
        break;

      case 'DuplicateUserName':
        errroMessage = 'کاربری قبلا با این ایمیل ثبت نام کرده است !';
        break;
      case 'REQUEST_NOT_VALID':
        errroMessage = 'درخواست شما معتبر نمی باشد!';
        break;
      default:
        break;
    }
    return throwError(errroMessage);
  }
}
