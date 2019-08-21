export interface IAuthorizationCode {
  grant_type?: string;
  code?: string;
  redirect_uri?: string;
}

export class AuthorizationCode implements IAuthorizationCode {
  constructor(
    // tslint:disable-next-line:variable-name
    public grant_type?: string,
    public code?: string,
    // tslint:disable-next-line:variable-name
    public redirect_uri?: string
  ) {}
}
