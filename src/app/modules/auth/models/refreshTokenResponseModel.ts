export class RefreshTokenRespnseModel {
  constructor(
    public accessToken: string,
    public refreshToken: string,
    public tokenExpiresIn: number
  ) {}
}
