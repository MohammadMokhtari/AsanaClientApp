import { UserApplication } from '../models/ApplicationUser';
import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/store/app.reducer';

export const selectUserFeature = (state: AppState) => state.auth;

export const getUser = createSelector(
  (state: AppState) => state.auth.user,
  (user: UserApplication | null) => user
);

export const isAuthenticated = createSelector(
  selectUserFeature,
  (state) => state.isAuthenticated
);

export const isLoading = createSelector(
  selectUserFeature,
  (state) => state.isLoading
);

export const getRefreshToken = createSelector(
  (state: AppState) => state.auth.user?.credential,
  (state) => state?.refreshToken
);

export const getAccessToken = createSelector(
  (state: AppState) => state.auth.user?.credential,
  (state) => state?.accessToken
);

export const getCredentialTokens = createSelector(
  (state: AppState) => state.auth.user,
  (state) => state?.credential
);
