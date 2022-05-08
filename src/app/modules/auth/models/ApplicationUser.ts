export class UserApplication {
  constructor(
    public id: string,
    public email: string,
    public userName: string,
    public photoUrl: string,
    public walletBalance: number,
    public score: number,
    public mobile: string | null,
    public firstName: string | null,
    public lastName: string | null,
    public fullName: string | null,
    public credential: UserCredential
  ) {}
}
export class UserCredential {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public tokenExpirationData: Date
  ) {}
}
