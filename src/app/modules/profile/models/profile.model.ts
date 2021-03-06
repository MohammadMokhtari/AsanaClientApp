import { Address } from './../profile-address/model/address.model';

export class ProfileModel {
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
