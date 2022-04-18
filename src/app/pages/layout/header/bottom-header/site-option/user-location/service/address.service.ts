import { AddressCreatedModel } from './../../../../../../../modules/account/account-address/model/addressCreateModel';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ResponseJsonStatus } from '@shared-module/models/ResponseJsonStatus';
import { Address } from '../address.model';
import { StorageService } from '@shared-module/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public addressChanged = new Subject<Address[]>();

  public editStarting = new Subject<Address | null>();

  public defaultAddress = new BehaviorSubject<Address | null>(null);

  private addresses: Address[] = [];

  public getAddresses() {
    return this.addresses.slice();
  }

  public changeDefaultAddress(
    addressId: string
  ): Observable<ResponseJsonStatus<Address>> {
    return this.http
      .get<ResponseJsonStatus<Address>>(`address/setAddress/${addressId}`)
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          this.SetDefaultAddress(data.data);
          this.updateAddresses(data.data.id);
        })
      );
  }

  public fetchAddress() {
    return this.http.get<ResponseJsonStatus<Address[]>>('address').pipe(
      tap((data) => {
        catchError(this.handleError), this.setAddresses(data.data);
      })
    );
  }

  public createAddress(address: AddressCreatedModel) {
    return this.http.post('address/create', address).pipe(
      catchError(this.handleError),
      tap((_) => {
        this.fetchAddress().subscribe();
      })
    );
  }

  public updateAddress(address: AddressCreatedModel) {
    return this.http.put('address/update', address).pipe(
      catchError(this.handleError),
      tap((_) => {
        this.fetchAddress().subscribe();
      })
    );
  }

  public deleteAddress(addressId: number) {
    return this.http.delete(`address/delete/${addressId}`).pipe(
      catchError(this.handleError),
      tap((_) => {
        this.fetchAddress().subscribe();
      })
    );
  }

  public getAddress(addressId: string): Address | null {
    return this.addresses.find((address) => address.id == addressId) ?? null;
  }

  public SetDefaultAddress(address: Address) {
    if (address) {
      this.defaultAddress.next(address);
      this.storageService.writeAddress(address);
      this.updateAddresses(address.id);
    }
  }

  public autoSetDefaultAddress(): void {
    this.fetchAddress().subscribe();
    const address = this.storageService.readAddress();
    if (address) {
      this.SetDefaultAddress(address);
    }
  }

  private setAddresses(addresses: Address[]): void {
    this.addresses = addresses;
    this.addressChanged.next(this.addresses.slice());
  }

  private updateAddresses(addressId: string): void {
    this.addresses.forEach((address) => (address.isDefault = false));

    const address = this.addresses.find((address) => {
      return address.id === addressId;
    });

    if (address) {
      address.isDefault = true;
      this.setAddresses(this.addresses);
    }
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
        errroMessage = 'آدرس یافت نشد';
        break;

      default:
        break;
    }
    return throwError(errroMessage);
  }
}
