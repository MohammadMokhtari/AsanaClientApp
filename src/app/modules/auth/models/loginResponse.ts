import { UserLoginResponseModel } from './userLoginResponseModel';
import { Address } from '../../account/account-address/model/address.model';

export interface LoginResponse {
  user: UserLoginResponseModel;
  defaultAddress: Address;
}
