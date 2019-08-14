export interface IUser {
  id: number;
  login: string;
  email: string;
  password: string;
}

export class User implements IUser {
  constructor(
    public id: number,
    public login: string,
    public email: string,
    public password: string
  ) {}
}
