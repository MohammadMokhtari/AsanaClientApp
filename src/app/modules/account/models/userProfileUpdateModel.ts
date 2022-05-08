export class UserProfileUpdateModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public nationalCode: string,
    public mobile: string,
    public creditCardNumber: string,
    public gender: string
  ) {}
}
