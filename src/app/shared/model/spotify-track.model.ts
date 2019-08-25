import {ISpotifyAlbum} from './spotify-album.model';
import {ISpotifyArtist} from './spotify-artist.model';

export interface ISpotifyTrack {
  album?: ISpotifyAlbum;
  artist?: Array<ISpotifyArtist>;
  duration_ms?: number;

}
