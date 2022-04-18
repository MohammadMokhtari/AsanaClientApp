import { UserLoginResponseModel } from './userLoginResponseModel';
import { Address } from '../../../pages/layout/header/bottom-header/site-option/user-location/address.model';

export interface LoginResponse {
  user: UserLoginResponseModel;
  defaultAddress: Address;
}
