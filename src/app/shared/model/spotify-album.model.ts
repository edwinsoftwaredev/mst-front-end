import {ISpotifyImageAlbum} from './spotify-image-album.model';

export interface ISpotifyAlbum {
  id?: string;
  images?: Array<ISpotifyImageAlbum>;
  name?: string;
  type?: string;
  uri?: string;
}

export class SpotifyAlbum  implements ISpotifyAlbum {
  constructor(
    public id?: string,
    public images?: Array<ISpotifyImageAlbum>,
    public name?: string,
    public type?: string,
    public uri?: string
  ) {}
}
