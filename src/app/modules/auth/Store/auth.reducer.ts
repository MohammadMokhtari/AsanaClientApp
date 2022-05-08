import { UserApplication } from '../models/ApplicationUser';
import { createReducer, on } from '@ngrx/store';

import * as fromAuthAction from '../Store/auth-actions';

export interface State {
  user: UserApplication | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authReducer = createReducer(
  initialState,
  on(fromAuthAction.Authentication, (state, response) => {
    return {
      ...state,
      user: response.user,
      isAuthenticated: true,
      isLoading: false,
    };
  }),
  on(fromAuthAction.LoginStart, (state) => {
    return {
      ...state,
      isLoading: true,
      authError: null,
    };
  }),
  on(fromAuthAction.AuthenticateSuccess, (state, response) => {
    return {
      ...state,
      user: response.user,
      isAuthenticated: true,
      isLoading: false,
    };
  }),
  on(fromAuthAction.AuthenticateFailed, () => initialState),
  on(fromAuthAction.LogOutStart, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromAuthAction.LogOutSuccess, () => initialState),
  on(fromAuthAction.LogoutDismiss, () => initialState),
  on(fromAuthAction.UpdateAuthUser, (state, payload) => {
    return {
      ...state,
      user: {
        ...state.user!,
        firstName: payload.firstName,
        lastName: payload.lastName,
        mobile: payload.phoneNumber,
        fullName: payload.firstName + ' ' + payload.lastName,
      },
    };
  })
);
