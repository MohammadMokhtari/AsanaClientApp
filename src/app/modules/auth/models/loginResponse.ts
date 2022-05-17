import { Address } from '../../profile/profile-address/model/address.model';
import { UserLoginResponseModel } from './userLoginResponseModel';

export interface LoginResponse {
  user: UserLoginResponseModel;
  defaultAddress: Address;
}
