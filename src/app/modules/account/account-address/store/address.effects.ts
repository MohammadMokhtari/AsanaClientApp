import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { Address } from 'src/app/modules/account/account-address/model/address.model';
import { StorageService } from './../../../shared/services/storage.service';
import { AddressServices } from './../services/address.service';
import * as fromAddressAction from './address.action';
import * as fromReminderAction from '../../../../store/reminder/remnder.actions';

import { of } from 'rxjs';

@Injectable()
export class AddressEffects {
  constructor(
    private readonly action$: Actions,
    private readonly addressService: AddressServices,
    private readonly storageService: StorageService
  ) {}

  getAddressesStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.GET_ADDRESSES_START),
      exhaustMap(() => {
        return this.addressService.getAddresses().pipe(
          map((response: Address[]) => {
            return fromAddressAction.GetAddressesSuccess({
              addresses: response,
            });
          })
        );
      })
    )
  );

  changeDefaultAddressStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.SetDefaultAddressStart),
      exhaustMap((actionPayload) => {
        return this.addressService
          .changeDefaultAddress(actionPayload.addressId)
          .pipe(
            map((response) => {
              return fromAddressAction.SetDefaultAddressSuccess(response.data);
            })
          );
      })
    )
  );

  setDefaultAddress$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromAddressAction.SET_DEFAULT_ADDRESS_SUCCESS),
        map((actionPayload) => {
          this.storageService.writeDefaultAddress(actionPayload);
        })
      ),
    { dispatch: false }
  );

  deleteAddressStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.DeleteAddressStart),
      exhaustMap((actionPayload) => {
        return this.addressService.deleteAddress(+actionPayload.addressId).pipe(
          map(() => {
            return fromAddressAction.DeleteAddressSuccess({
              addressId: actionPayload.addressId,
            });
          }),
          catchError((error) => {
            return of(
              fromAddressAction.DeleteAddressFailed({ errorMessage: error })
            );
          })
        );
      })
    )
  );

  deleteAddressSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.DELETE_ADDRESS_SUCCESS),
      map(() => {
        return fromReminderAction.Reminder({
          message: 'آدرس با موفقیت حذف شد!',
          reminderType: 'snackbar-notification--info',
          reminderDuration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
    )
  );

  updateAddressSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.UPDATE_ADDRESS_SUCCESS),
      map(() => {
        return fromReminderAction.Reminder({
          message: 'آدرس با موفقیت به روز رسانی شد',
          reminderType: 'snackbar-notification--info',
          reminderDuration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
    )
  );
  createAddressSuccess$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.CREATE_ADDRESS_SUCCESS),
      map(() => {
        return fromReminderAction.Reminder({
          message: 'آدرس جدید با موفقیت اضافه شد',
          reminderType: 'snackbar-notification--info',
          reminderDuration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
    )
  );

  updateAddressStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.UpdateAddressStart),
      exhaustMap((actionPayload) => {
        return this.addressService.updateAddress(actionPayload.address).pipe(
          map(() => {
            return fromAddressAction.UpdateAddressSuccess(actionPayload);
          }),
          catchError((error) =>
            of(fromAddressAction.UpdateAddressFailed({ errorMessage: error }))
          )
        );
      })
    )
  );

  reminderFailed$ = createEffect(() =>
    this.action$.pipe(
      ofType(
        fromAddressAction.DELETE_ADDRESS_FAILED,
        fromAddressAction.UPDATE_ADDRESS_FAILED,
        fromAddressAction.SET_DEFAULT_ADDRESS_FAILED,
        fromAddressAction.CREATE_ADDRESS_FAILED
      ),
      map((actionPayload: { errorMessage: string }) => {
        return fromReminderAction.Reminder({
          message: actionPayload.errorMessage,
          reminderType: 'snackbar-notification--error',
          reminderDuration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
    )
  );

  createAddressStart$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddressAction.CreateAddressStart),
      exhaustMap((actionPayload) => {
        return this.addressService
          .createAddress(actionPayload.addressCreateModel)
          .pipe(
            map(() => {
              return fromAddressAction.GetAddressesStart();
            }),
            catchError((error) =>
              of(fromAddressAction.CreateAddressFailed({ errorMessage: error }))
            )
          );
      })
    )
  );
}
