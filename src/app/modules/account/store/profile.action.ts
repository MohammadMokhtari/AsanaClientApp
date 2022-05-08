import { ProfileUpdateRequest } from '../models/profileUpdateRequest.model';
import { UserProfile } from './../models/UserProfile';

import { createAction, props } from '@ngrx/store';

export const PROFILE_INFO_START = '[profile] ProfileInfoStart';
export const PROFILE_INFO_SUCCESS = '[profile] ProfileInfoSuccess';
export const PROFILE_INFO_FAILED = '[profile] ProfileInfoFailed';
export const PROFILE_UPDATE_START = '[profile] PrfileUpdateStart';
export const PROFILE_UPDATE_SUCCESS = '[profile] ProfileUpdateSuccess';
export const PRFILE_UPDATE_FAILED = '[profile] ProfileFailed';

export const ProfileInfoStart = createAction(PROFILE_INFO_START);

export const ProfileInfoSuccess = createAction(
  PROFILE_INFO_SUCCESS,
  props<UserProfile>()
);

export const ProfileUpdateStart = createAction(
  PROFILE_UPDATE_START,
  props<ProfileUpdateRequest>()
);

export const ProfileUpdateSuccess = createAction(
  PROFILE_UPDATE_SUCCESS,
  props<ProfileUpdateRequest>()
);

export const ProfileUpdateFailed = createAction(
  PRFILE_UPDATE_FAILED,
  props<{ errorMessage: string }>()
);
