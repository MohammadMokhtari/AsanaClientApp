import { AppState } from 'src/app/store/app.reducer';
import { createSelector } from '@ngrx/store';
import { state } from '@angular/animations';

export const userProfile = createSelector(
  (state: AppState) => state.profile,
  (state) => state.userProfile
);

export const isLoading = createSelector(
  (state: AppState) => state.profile,
  (state) => state.isLoading
);

export const profileError = createSelector(
  (state: AppState) => state.profile,
  (state) => state.profileError
);

export const midifiefStatus = createSelector(
  (state: AppState) => state.profile,
  (state) => state.modifiedStatus
);
