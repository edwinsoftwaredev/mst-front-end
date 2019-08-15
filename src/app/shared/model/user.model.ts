import {Moment} from 'moment';

export interface IUser {
  id?: number;
  login?: string;
  email?: string;
  password?: string;
  createdBy?: string;
  createdDate?: Moment;
  lastUpdatedBy?: string;
  lastUpdatedDate?: Moment;
}

export class UserModel implements IUser {
  constructor(
    public id?: number,
    public login?: string,
    public email?: string,
    public password?: string,
    public createdBy?: string,
    public createdDate?: Moment,
    public lastUpdatedBy?: string,
    public lastUpdatedDate?: Moment
  ) {}
}
