import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, shareReplay, map } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable, throwError } from 'rxjs';

import { StorageService } from '@shared-module/services/storage.service';
import { ResponseJsonStatus } from './../../../shared/models/ResponseJsonStatus';
import { AddressCreatedModel } from './../model/addressCreateModel';
import { Address } from '../model/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressServices {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private addresses: Address[] = [];

  private addressesObs: Observable<Address[]> | null;

  public addressesChanged = new Subject<Address[]>();

  public editStarting = new Subject<Address | null>();

  public defaultAddress = new BehaviorSubject<Address | null>(null);

  public getAddresses() {
    if (this.addressesObs) {
      return this.addressesObs;
    }
    this.addressesObs = this.fetchAddress();
    return this.addressesObs;
  }

  public AllAddresses() {
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
        })
      );
  }

  public createAddress(address: AddressCreatedModel) {
    return this.http.post('address', address).pipe(
      catchError(this.handleError),
      tap((_) => {
        this.addressesObs = null;
        this.getAddresses().subscribe();
      })
    );
  }

  public updateAddress(address: AddressCreatedModel) {
    return this.http.put('address/update', address).pipe(
      catchError(this.handleError),
      tap((_) => {
        this.addressesObs = null;
        this.getAddresses().subscribe();
      })
    );
  }

  private fetchAddress(): Observable<Address[]> {
    return this.http.get<ResponseJsonStatus<Address[]>>('address').pipe(
      map((response) => {
        return response.data;
      }),
      catchError(this.handleError),
      tap((data) => {
        this.setAddresses(data);
      }),
      shareReplay()
    );
  }

  public deleteAddress(addressId: number) {
    return this.http.delete(`address/delete/${addressId}`).pipe(
      catchError(this.handleError),
      tap((_) => {
        this.addressesObs = null;
        this.getAddresses().subscribe((addresses) => {
          this.changeDefaultAddress(addresses[0].id).subscribe();
        });
      })
    );
  }

  public getAddress(addressId: string): Address | null {
    return this.addresses.find((address) => address.id == addressId) ?? null;
  }

  public SetDefaultAddress(address: Address) {
    if (address) {
      this.defaultAddress.next(address);
      this.storageService.writeDefaultAddress(address);
      this.updateAddresses(address.id);
      return;
    }
  }

  public autoSetDefaultAddress(): void {
    const address = this.storageService.readDefaultAddress();
    if (address) {
      this.SetDefaultAddress(address);
    }
  }

  private setAddresses(addresses: Address[]): void {
    this.addresses = addresses;
    this.addressesChanged.next(this.addresses.slice());
  }

  private updateAddresses(addressId: string = ''): void {
    this.addresses.forEach((address) => (address.isDefault = false));

    if (addressId) {
      const address = this.addresses.find((address) => {
        return address.id === addressId;
      });

      if (address) {
        address.isDefault = true;
        this.setAddresses(this.addresses);
        return;
      }
    }
    if (this.addresses.length > 0) {
      this.addresses[0].isDefault = true;
      this.SetDefaultAddress(this.addresses[0]);
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
