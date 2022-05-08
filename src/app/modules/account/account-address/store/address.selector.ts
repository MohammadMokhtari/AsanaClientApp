import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';

export const selectAddressFeature = (state: AppState) => state.addresses;

export const Addresses = createSelector(
  selectAddressFeature,
  (state) => state.addresses
);

export const isLoading = createSelector(
  selectAddressFeature,
  (state) => state.isLoading
);

export const DefaultAddress = createSelector(
  selectAddressFeature,
  (state) => state.addresses?.find((address) => address.isDefault) ?? null
);

export const EditAddress = createSelector(
  selectAddressFeature,
  (state) => state.editAddress
);
