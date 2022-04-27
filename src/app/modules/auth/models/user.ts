export class User {
  constructor(
    public id: string,
    public email: string,
    public userName: string,
    public photoUrl: string,
    public walletBalance: number,
    public token: string | null,
    public refreshToken: string,
    public tokenExpirationData: Date,
    public score: number,
    public mobile: string | null,
    public firstName: string | null,
    public lastName: string | null,
    public fullName: string | null
  ) {}
}
