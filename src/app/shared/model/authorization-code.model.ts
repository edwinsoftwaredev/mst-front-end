export interface IAuthorizationCode {
  code?: string;
}

export class AuthorizationCode {
  constructor(
    public code?: string
  ) {}
}
