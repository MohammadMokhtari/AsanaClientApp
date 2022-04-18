import { UploadResponse } from './uploadResponse';
import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class UserFileUploadService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  private blankUrl: string =
    'https://localhost:44373/media/images/profile/blank.jpg';

  public uploadUserPhoto(data: FormData) {
    return this.http
      .post('profile/updatePhoto', data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        catchError(this.handleError),
        tap((event) => {
          if (event.type === HttpEventType.Response) {
            const result = event.body as ResponseJsonStatus<UploadResponse>;
            this.authService.updateUserPhoto(result.data.photoUrl);
          }
        })
      );
  }

  public removeUserPhoto() {
    return this.http.delete('profile/deletePhoto').pipe(
      catchError(this.handleError),
      tap((data) => {
        this.authService.updateUserPhoto(this.blankUrl);
      })
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errroMessage = 'خطایی رخ داده لطفا بعدا دوباره تلاش کنید !';

    if (!errorRes.error || !errorRes.error.errors) {
      return throwError(errroMessage);
    }
    switch (errorRes.error.errors[0]) {
      case 'INVALID_INPUT':
        errroMessage = 'ورودی معتبر نمی باشد!';
        break;

      case 'REQUEST_NOT_VALID':
        errroMessage = 'درخواست شما معتبر نمی باشد!';
        break;

      default:
        break;
    }
    switch (errorRes.error.errors[''][0]) {
      case 'Failed to read the request form. Request body too large.':
        errroMessage = 'حجم فایل انتخاب شده بیشتر از حد مجاز است';
        break;

      default:
        break;
    }
    return throwError(errroMessage);
  }
}
