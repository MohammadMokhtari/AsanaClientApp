import { Option } from '@shared-module/forms/select/selectOption';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';
import { ProfileUpdateRequest } from '../models/profileUpdateRequest.model';
import { UserProfile } from '../models/UserProfile';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  AccountSub = new BehaviorSubject<UserProfile | null>(null);

  public GetUserInfo(): Observable<ResponseJsonStatus<UserProfile>> {
    return this.http.get<ResponseJsonStatus<UserProfile>>('profile/info').pipe(
      tap((res) => {}),
      catchError(this.HandleError)
    );
  }

  public UpdateAccount(
    account: ProfileUpdateRequest
  ): Observable<ResponseJsonStatus<UserProfile>> {
    console.log(account);
    return this.http
      .put<ResponseJsonStatus<any>>('profile/update', account)
      .pipe(catchError(this.HandleError));
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

  public get genderOptions(): Option[] {
    return [
      new Option('مذکر', 'Male'),
      new Option('مونث', 'Female'),
      new Option('نامشخص', 'Unknown'),
    ];
  }
}
