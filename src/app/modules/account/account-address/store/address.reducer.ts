import { createReducer, on } from '@ngrx/store';

import { Address } from 'src/app/modules/account/account-address/model/address.model';
import * as fromAddressAction from './address.action';

export interface State {
  addresses: Address[] | null;
  isLoading: boolean;
  editAddress: Address | null;
}

const initialState: State = {
  addresses: null,
  isLoading: false,
  editAddress: null,
};

export const addressreducer = createReducer(
  initialState,
  on(fromAddressAction.GetAddressesStart, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromAddressAction.GetAddressesSuccess, (state, payload) => {
    return {
      ...state,
      addresses: [...payload.addresses],
      isLoading: false,
    };
  }),
  on(fromAddressAction.SetDefaultAddressStart, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromAddressAction.SetDefaultAddressSuccess, (state, payload) => {
    if (state.addresses) {
      let newAddresses: Address[] = [...state.addresses];
      newAddresses = newAddresses.map((address) => {
        return {
          ...address,
          isDefault: false,
          fullAddress: address.fullAddress,
        };
      });
      const address = newAddresses.find((address) => address.id === payload.id);
      if (address) address.isDefault = true;
      return {
        ...state,
        isLoading: false,
        addresses: [...newAddresses],
      };
    }
    return {
      ...state,
      isLoading: false,
      addresses: [{ ...payload }],
    };
  }),
  on(fromAddressAction.DeleteAddressStart, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromAddressAction.DeleteAddressSuccess, (state, payload) => {
    if (state.addresses) {
      return {
        ...state,
        isLoading: false,
        addresses: state.addresses.filter(
          (address) => address.id !== payload.addressId
        ),
      };
    }
    return {
      ...state,
    };
  }),
  on(fromAddressAction.UpdateAddressStart, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromAddressAction.UpdateAddressSuccess, (state, payload) => {
    if (state.addresses) {
      let updateAddresses: Address[] = [...state.addresses];

      const updateAddress = {
        ...updateAddresses.find(
          (address) => address.id === payload.address.id
        )!,
        ...payload.address,
      };

      let addressIndex = updateAddresses.findIndex(
        (address) => address.id === payload.address.id
      );

      updateAddresses[addressIndex] = updateAddress;

      return {
        ...state,
        isLoading: false,
        addresses: [...updateAddresses],
      };
    }
    return {
      ...state,
    };
  }),
  on(fromAddressAction.CreateAddressStart, (state) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(fromAddressAction.CreateAddressSuccess, (state, payload) => {
    return {
      ...state,
      addresses: [...state.addresses!, { ...payload.address }],
    };
  }),
  on(fromAddressAction.StartEdit, (state, payload) => {
    return {
      ...state,
      editAddress: payload.address,
    };
  }),
  on(fromAddressAction.StopEdit, (state) => {
    return {
      ...state,
      editAddress: null,
    };
  })
);
