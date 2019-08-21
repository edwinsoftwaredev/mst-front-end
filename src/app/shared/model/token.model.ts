import {IUser} from './user.model';

export interface IToken {
  id?: number;
  accessToken?: string;
  tokenType?: string;
  scope?: string;
  expiresIn?: number;
  refreshToken?: string;
  user?: IUser;
}

export class Token {
  constructor(
    public id?: number,
    public accessToken?: string,
    public tokenType?: string,
    public scope?: string,
    public expiresIn?: number,
    public refreshToken?: string,
    public user?: IUser
  ) {}
}
