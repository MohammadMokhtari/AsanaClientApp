import { Address } from '../../../pages/layout/header/bottom-header/site-option/user-location/address.model';

export class AccountModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public fullName: string,
    public photoUrl: string,
    public email: string,
    public userName: string,
    public nationalCode: string,
    public creditCardNumber: string,
    public mobile: string,
    public score: number,
    public gender: string,
    public walletBalance: string,
    public addresses: Address[],
    public createdOn: string,
    public modifiedOn: string
  ) {}
}
