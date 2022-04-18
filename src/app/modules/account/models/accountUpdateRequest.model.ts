export class AccountUpdateRequestModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public nationalCode: string,
    public creditCardNumber: string,
    public phoneNumber: string,
    public gender: string
  ) {}
}
