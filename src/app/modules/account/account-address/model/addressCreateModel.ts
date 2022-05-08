export class AddressCreatedModel {
  constructor(
    public addressLine: string,
    public postalCode: string,
    public numberPlate: string,
    public unitNumber: string,
    public cityName: string,
    public stateName: string,
    public recipientFirstName: string,
    public recipientLastName: string,
    public recipientNationalCode: string,
    public recipientPhoneNumber: string
  ) {}
}
export class AddressUpdateModel {
  constructor(
    public id: string,
    public addressLine: string,
    public postalCode: string,
    public numberPlate: string,
    public unitNumber: string,
    public cityName: string,
    public provinceName: string,
    public recipientFirstName: string,
    public recipientLastName: string,
    public recipientNationalCode: string,
    public recipientPhoneNumber: string
  ) {}
  public fullAddress: string =
    this.provinceName +
    ' ' +
    this.cityName +
    ' ' +
    this.addressLine +
    ' ' +
    this.numberPlate;
}
