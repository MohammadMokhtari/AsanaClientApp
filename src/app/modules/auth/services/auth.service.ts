import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { User } from './../models/user';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { LoginResponse } from '../models/loginResponse';
import { StorageService } from '@shared-module/services/storage.service';
import { ResetPasswordModel } from './../models/resetPasswordModel';
import { ForgotPasswordModel } from './../models/forgotPasswordModel';
import { ResponseJsonStatus } from '../../shared/models/ResponseJsonStatus';
import { AddressServices } from '../../account/account-address/services/address.service';
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
    private storageService: StorageService,
    private addressService: AddressServices
  ) {
    this._jwtHelper = new JwtHelperService();
  }

  public CurrentUser = new BehaviorSubject<User | null>(null);

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
    ).pipe(
      catchError(this.handleError),
      tap((result) => {
        this.authentication(result.data.user);
        this.addressService.SetDefaultAddress(result.data.defaultAddress);
      })
    );
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
    }).pipe(take(1));
  }

  public signOutUser() {
    const user = this.storageService.readUser();
    if (!user) {
      return;
    }
    this.revokeToken(user.refreshToken).subscribe((_) => {
      this.removeCurrentUser();
      this.storageService.clearStorage();
      this.route.navigate(['/']);
    });
  }

  public autoLogin(): void {
    const user = this.storageService.readUser();
    if (!user) {
      return;
    }
    if (this._jwtHelper.isTokenExpired(user.token!)) {
      const user = this.storageService.readUser();
      if (!user) return this.signOutUser();

      if (!user?.token) return this.signOutUser();

      const refreshTokenReq = new RefreshTokenRequestModel(
        user.token,
        user.refreshToken
      );

      this.refreshToken(refreshTokenReq).subscribe(
        (response) => {
          console.log(response);
          this.updateUserCredential(
            response.data.accessToken,
            response.data.refreshToken
          );
        },
        (error) => {
          console.log(error);
          this.signOutUser();
        }
      );
    }
    this.setCurrentUser(user);
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

  public setCurrentUser(user: User): void {
    this.CurrentUser.next(user);
  }

  public removeCurrentUser(): void {
    this.CurrentUser.next(null);
  }

  public updateCurrentUser(
    photoUrl: string,
    firstName?: string,
    lastName?: string,
    fullName?: string,
    mobile?: string
  ) {
    const user = this.storageService.readUser();
    if (user) {
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.fullName = fullName ?? user.fullName;
      user.mobile = mobile ?? user.mobile;
      user.photoUrl = photoUrl;

      this.CurrentUser.next(user);
      this.storageService.writeUser(user);
    }
  }

  updateUserCredential(accessToken: string, refreshToken: string) {
    const user = this.storageService.readUser();
    if (user) {
      user.token = accessToken;
      user.refreshToken = refreshToken;

      this.CurrentUser.next(user);
      this.storageService.writeUser(user);
    }
  }

  public updateUserPhoto(photoUrl: string): void {
    this.updateCurrentUser(photoUrl);
  }

  private authentication(result: UserLoginResponseModel) {
    const expirationDate = new Date(
      new Date().getTime() + result.tokenExpiresIn * 1000
    );
    const user = new User(
      result.userId,
      result.email,
      result.userName,
      result.photoUrl,
      +result.walletBalance,
      result.token,
      result.refreshToken,
      expirationDate,
      +result.score,
      result.mobile,
      result.firstName,
      result.lastName,
      result.fullName
    );
    this.setCurrentUser(user);
    this.storageService.writeUser(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
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
