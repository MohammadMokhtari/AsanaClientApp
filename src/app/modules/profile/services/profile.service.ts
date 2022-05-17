import { ProfileUpdateRequestModel } from './../models/profileUpdateRequest.model';
import { ProfileModel } from './../models/profile.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  AccountSub = new BehaviorSubject<ProfileModel | null>(null);

  public GetUserInfo(): Observable<ResponseJsonStatus<ProfileModel>> {
    return this.http.get<ResponseJsonStatus<ProfileModel>>('profile/info').pipe(
      tap((res) => {
        this.AccountSub.next(res.data);
      }),
      catchError(this.HandleError)
    );
  }

  public UpdateAccount(
    account: ProfileUpdateRequestModel
  ): Observable<ResponseJsonStatus<ProfileModel>> {
    return this.http
      .put<ResponseJsonStatus<ProfileModel>>('profile/update', account)
      .pipe(
        tap((_) => {
          this.GetUserInfo().subscribe((user) => {
            this.authService.updateCurrentUser(
              user.data.photoUrl,
              user.data.firstName,
              user.data.lastName,
              user.data.fullName,
              user.data.mobile
            );
          });
        }),
        catchError(this.HandleError)
      );
  }

  public ResetAccount() {
    this.AccountSub.next(null);
  }

  private HandleError(errorRes: HttpErrorResponse) {
    let errroMessage = 'خطایی رخ داده لطفا بعدا دوباره تلاش کنید !';
    if (!errorRes.error || !errorRes.error.errors) {
      return throwError(errroMessage);
    }
    switch (errorRes.error.errors[0]) {
      case 'USER_NOT_FOUND':
        errroMessage = 'درخواست معتبر نمی باشد!';
        break;

      default:
        errroMessage = errorRes.error.errors[0];
        break;
    }
    return throwError(errroMessage);
  }
}
