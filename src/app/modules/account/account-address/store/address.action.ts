import { createAction, props } from '@ngrx/store';

import {
  AddressUpdateModel,
  AddressCreatedModel,
} from './../model/addressCreateModel';
import { Address } from 'src/app/modules/account/account-address/model/address.model';

export const GET_ADDRESSES_START = '[address] GetAddressesStart';
export const GET_ADDRESSES_SUCCESS = '[address] GetAddressesSuccessful';
export const GET_ADDRESSES_FAILED = '[address] GetAddressesFailed';
export const SET_DEFAULT_ADDRESS_START = '[address] SetDefaultAddressStart';
export const SET_DEFAULT_ADDRESS_SUCCESS = '[address] SetDefaultAddressSuccess';
export const SET_DEFAULT_ADDRESS_FAILED = '[address] SetAddressFailed';
export const DELETE_ADDRESS_START = '[address] DeleteAddressStart';
export const DELETE_ADDRESS_SUCCESS = '[address] DeleteAddressSuccess';
export const DELETE_ADDRESS_FAILED = '[address] DeleteAddressFailed';
export const UPDATE_ADDRESS_START = '[address] UpdateAddressStart';
export const UPDATE_ADDRESS_SUCCESS = '[address] UpdateAddressSuccess';
export const UPDATE_ADDRESS_FAILED = '[address] UpdateAddressFailed';
export const CREATE_ADDRESS_START = '[address] CreatedAddressStart';
export const CREATE_ADDRESS_SUCCESS = '[address] CreatedAddressSuccess';
export const CREATE_ADDRESS_FAILED = '[address] CreateAddressFailed';
export const START_EDIT = '[address] StartAddressEdit';
export const STOP_EDIT = '[address] StopAddressEdit';

export const GetAddressesStart = createAction(GET_ADDRESSES_START);

export const GetAddressesSuccess = createAction(
  GET_ADDRESSES_SUCCESS,
  props<{ addresses: Address[] }>()
);

export const SetDefaultAddressStart = createAction(
  SET_DEFAULT_ADDRESS_START,
  props<{ addressId: string }>()
);

export const SetDefaultAddressSuccess = createAction(
  SET_DEFAULT_ADDRESS_SUCCESS,
  props<Address>()
);

export const DeleteAddressStart = createAction(
  DELETE_ADDRESS_START,
  props<{ addressId: string }>()
);

export const DeleteAddressSuccess = createAction(
  DELETE_ADDRESS_SUCCESS,
  props<{ addressId: string }>()
);

export const DeleteAddressFailed = createAction(
  DELETE_ADDRESS_FAILED,
  props<{ errorMessage: string }>()
);

export const UpdateAddressStart = createAction(
  UPDATE_ADDRESS_START,
  props<{ address: AddressUpdateModel }>()
);

export const UpdateAddressSuccess = createAction(
  UPDATE_ADDRESS_SUCCESS,
  props<{ address: AddressUpdateModel }>()
);

export const UpdateAddressFailed = createAction(
  UPDATE_ADDRESS_FAILED,
  props<{ errorMessage: string }>()
);

export const CreateAddressStart = createAction(
  CREATE_ADDRESS_START,
  props<{ addressCreateModel: AddressCreatedModel }>()
);

export const CreateAddressSuccess = createAction(
  CREATE_ADDRESS_SUCCESS,
  props<{ address: Address }>()
);

export const CreateAddressFailed = createAction(
  CREATE_ADDRESS_FAILED,
  props<{ errorMessage: string }>()
);

export const StartEdit = createAction(
  START_EDIT,
  props<{ address: Address }>()
);

export const StopEdit = createAction(STOP_EDIT);
