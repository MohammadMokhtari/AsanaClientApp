import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, shareReplay, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {
  AddressCreatedModel,
  AddressUpdateModel,
} from './../model/addressCreateModel';
import { ResponseJsonStatus } from './../../../shared/models/ResponseJsonStatus';
import { Address } from 'src/app/modules/account/account-address/model/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressServices {
  constructor(private http: HttpClient) {}

  private addressesObs: Observable<Address[]> | null;

  public editStarting = new Subject<Address | null>();

  public getAddresses() {
    if (this.addressesObs) {
      return this.addressesObs;
    }
    this.addressesObs = this.fetchAddress();
    return this.addressesObs;
  }

  public changeDefaultAddress(
    addressId: string
  ): Observable<ResponseJsonStatus<Address>> {
    return this.http
      .get<ResponseJsonStatus<Address>>(`address/setAddress/${addressId}`)
      .pipe(catchError(this.handleError));
  }

  public createAddress(address: AddressCreatedModel) {
    return this.http
      .post('address', address)
      .pipe(catchError(this.handleError));
  }

  public updateAddress(address: AddressUpdateModel) {
    return this.http
      .put('address/update', address)
      .pipe(catchError(this.handleError));
  }

  private fetchAddress(): Observable<Address[]> {
    return this.http.get<ResponseJsonStatus<Address[]>>('address').pipe(
      map((response) => {
        return response.data;
      }),
      catchError(this.handleError)
      // shareReplay()
    );
  }

  public deleteAddress(addressId: number) {
    return this.http
      .delete(`address/delete/${addressId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errroMessage = 'خطایی رخ داده لطفا بعدا دوباره تلاش کنید !';

    if (!errorRes.error || !errorRes.error.errors) {
      return throwError(errroMessage);
    }
    switch (errorRes.error.errors[0]) {
      case 'COULD_NOT_GET_USER_ADDRESSES':
        errroMessage = 'آدرس های کاربر یافت نشد !';
        break;

      case 'COULD_NOT_SET_DEFAULT_ADDRESS':
        errroMessage = 'آدرس پیش فرض ثبت نشد !';
        break;

      case 'NOT_FOUND_ADDRESS':
        errroMessage = 'آدرس یافت نشد !';
        break;

      default:
        break;
    }
    return throwError(errroMessage);
  }
}
