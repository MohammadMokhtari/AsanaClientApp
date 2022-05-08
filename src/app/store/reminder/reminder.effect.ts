import { map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as fromReminderAction from '../reminder/remnder.actions';
import { ReminderComponent } from '@shared-module/reminder/reminder.component';
import { ReminderPayload } from './remnder.actions';

@Injectable()
export class RemminderEffect {
  constructor(private actions$: Actions, private _snackBar: MatSnackBar) {}

  reminder$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromReminderAction.REMINDER),
        map((payload: ReminderPayload) => {
          console.log(payload.reminderType);
          this._snackBar.openFromComponent(ReminderComponent, {
            data: payload.message,
            duration: payload.reminderDuration,
            panelClass: payload.reminderType,
            horizontalPosition: payload.horizontalPosition,
            verticalPosition: payload.verticalPosition,
          });
        })
      ),
    { dispatch: false }
  );
}
