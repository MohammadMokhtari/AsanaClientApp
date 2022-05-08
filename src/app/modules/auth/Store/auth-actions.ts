import { Address } from './../../account/account-address/model/address.model';
import { createAction, props } from '@ngrx/store';

import { LoginModel } from '../models/loginModel';
import { UserApplication } from '../models/ApplicationUser';
import { LoginResponse } from '../models/loginResponse';

export const AUTHENTICATION = '[auth] Authentication';
export const LOGIN_START = '[auth] LoginStart';
export const LOGOUT_START = '[auth] LogoutStart';
export const LOGOUT_DISMISS = '[auth] LogoutDismiss';
export const AUTHENTICATE_CONFIRMATION = '[auth] AuthenticateConfirmation';
export const AUTHENTICATE_FAILED = '[auth] AuthenticateFailed';
export const AUTHENTICATE_SUCCESS = '[auth] AuthenticateSuccess';
export const LOGOUT_SUCCESS = '[auth] logoutSuccess';
export const AUTO_LOGIN = '[auth] AutoLogin';
export const REFRESH_TOKEN_START = '[auth] RefreshTokenStart';
export const REFRESH_TOKEN_SUCCESS = '[auth] RefreshTokenSuccess';
export const UPDATE_AUTH_USER = '[auth] UpdateAuthUser';
export const RESET = '[auth] reset';

export const Authentication = createAction(
  AUTHENTICATION,
  props<{ user: UserApplication; defaultAddress: Address }>()
);

export const AuthenticateFailed = createAction(
  AUTHENTICATE_FAILED,
  props<{ errorMessage: string }>()
);

export const AuthenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{ user: UserApplication }>()
);

export const RefreshTokenStart = createAction(
  REFRESH_TOKEN_START,
  props<{ accessToken: string; refreshToken: string }>()
);

export const LoginStart = createAction(LOGIN_START, props<LoginModel>());

export const AuthenticateConfirmation = createAction(
  AUTHENTICATE_CONFIRMATION,
  props<LoginResponse>()
);

export const UpdateAuthUser = createAction(
  UPDATE_AUTH_USER,
  props<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }>()
);

export const RefreshTokenSuccess = createAction(REFRESH_TOKEN_SUCCESS);

export const LogOutStart = createAction(LOGOUT_START);

export const LogOutSuccess = createAction(LOGOUT_SUCCESS);

export const LogoutDismiss = createAction(LOGOUT_DISMISS);

export const AutoLogin = createAction(AUTO_LOGIN);

export const Reset = createAction(RESET);
