import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';
import { AccountUpdateRequestModel } from '../models/accountUpdateRequest.model';
import { AccountModel } from '../models/account.model';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  AccountSub = new BehaviorSubject<AccountModel | null>(null);

  public GetUserInfo(): Observable<ResponseJsonStatus<AccountModel>> {
    return this.http.get<ResponseJsonStatus<AccountModel>>('profile/info').pipe(
      tap((res) => {
        this.AccountSub.next(res.data);
      }),
      catchError(this.HandleError)
    );
  }

  public UpdateAccount(
    account: AccountUpdateRequestModel
  ): Observable<ResponseJsonStatus<AccountModel>> {
    return this.http
      .put<ResponseJsonStatus<AccountModel>>('profile/update', account)
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
