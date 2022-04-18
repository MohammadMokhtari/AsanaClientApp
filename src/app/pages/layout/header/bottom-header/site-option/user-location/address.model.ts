export class Address {
  constructor(
    public id: string,
    public addressLine: string,
    public postalCode: string,
    public numberPlate: string,
    public unitNumber: string,
    public cityName: string,
    public stateName: string,
    public fullAddress: string,
    public isDefault: boolean,
    public recipientFirstName: string,
    public recipientLastName: string,
    public recipientNationalCode: string,
    public recipientPhoneNumber: string
  ) {}
}
