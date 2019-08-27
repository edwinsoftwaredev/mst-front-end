import {Moment} from 'moment';
import {IToken} from './token.model';

export interface IUser {
  id?: number;
  login?: string;
  email?: string;
  password?: string;
  token?: IToken;
  hasToken?: boolean;
  createdBy?: string;
  createdDate?: Moment;
  lastUpdatedBy?: string;
  lastUpdatedDate?: Moment;
  playlistId?: string;
}

export class UserModel implements IUser {
  constructor(
    public id?: number,
    public login?: string,
    public email?: string,
    public password?: string,
    public token?: IToken,
    public hasToken?: boolean,
    public createdBy?: string,
    public createdDate?: Moment,
    public lastUpdatedBy?: string,
    public lastUpdatedDate?: Moment,
    public playlistId?: string
  ) {}
}
