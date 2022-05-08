import { createReducer, on } from '@ngrx/store';

import { UserProfile } from '../models/UserProfile';
import * as fromProfileAction from './profile.action';

export interface State {
  userProfile: UserProfile | null;
  isLoading: boolean;
  profileError: string | null;
  modifiedStatus: boolean;
}

const initialState: State = {
  userProfile: null,
  isLoading: false,
  profileError: null,
  modifiedStatus: false,
};

export const profileReducer = createReducer(
  initialState,
  on(fromProfileAction.ProfileInfoStart, (state) => {
    return {
      ...state,
      isLoading: true,
      profileErorr: null,
      modifiedStatus: false,
    };
  }),
  on(fromProfileAction.ProfileInfoSuccess, (state, userProfile) => {
    return {
      ...state,
      isLoading: false,
      userProfile: userProfile,
      profileErorr: null,
      modifiedStatus: false,
    };
  }),
  on(fromProfileAction.ProfileUpdateStart, (state) => {
    return {
      ...state,
      isLoading: true,
      profileErorr: null,
      modifiedStatus: false,
    };
  }),
  on(fromProfileAction.ProfileUpdateSuccess, (state, payload) => {
    return {
      ...state,
      userProfile: {
        ...state.userProfile!,
        firstName: payload.firstName,
        lastName: payload.lastName,
        creditCardNumber: payload.creditCardNumber,
        nationalCode: payload.nationalCode,
        gender: payload.gender,
        mobile: payload.phoneNumber,
      },
      isLoading: false,
      profileErorr: null,
      modifiedStatus: true,
    };
  }),
  on(fromProfileAction.ProfileUpdateFailed, (state, { errorMessage }) => {
    return {
      ...state,
      profileErorr: errorMessage,
      isLoading: false,
      modifiedStatus: false,
    };
  })
);
