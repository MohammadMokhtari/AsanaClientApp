import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { createAction, props } from '@ngrx/store';

export const REMINDER = '[reminder] reminder';

export interface ReminderPayload {
  message: string;
  reminderType: reminderType;
  reminderDuration: number;
  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;
}

type reminderType =
  | 'snackbar-notification--error'
  | 'snackbar-notification--success'
  | 'snackbar-notification--info'
  | 'snackbar-notification--warning';

export const Reminder = createAction(REMINDER, props<ReminderPayload>());
