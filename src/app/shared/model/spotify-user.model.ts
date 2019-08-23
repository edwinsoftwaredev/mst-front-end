import {ISpotifyUserImage} from './spotify-user-image.model';

export interface ISpotifyUser {
  country?: string;
  display_name?: string;
  email?: string;
  href?: string;
  id?: string;
  images?: Array<ISpotifyUserImage>;
  type?: string;
}

export class SpotifyUser implements ISpotifyUser {
  // tslint:disable
  constructor(
    public country?: string,
    public display_name?: string,
    public email?: string,
    public href?: string,
    public id?: string,
    public images?: Array<ISpotifyUserImage>,
    public type?: string
  ) {}
}
