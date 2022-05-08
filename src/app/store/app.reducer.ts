import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../modules/auth/Store/auth.reducer';
import * as fromProfie from '../modules/account/store/profile.reducer';
import * as fromAddress from '../modules/account/account-address/store/address.reducer';

export interface AppState {
  auth: fromAuth.State;
  profile: fromProfie.State;
  addresses: fromAddress.State;
}
export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  profile: fromProfie.profileReducer,
  addresses: fromAddress.addressreducer,
};
