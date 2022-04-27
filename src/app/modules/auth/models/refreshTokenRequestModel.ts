export class RefreshTokenRequestModel {
  constructor(public accessToken: string, public refreshToken: string) {}
}
