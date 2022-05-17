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
    public id: number,
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
