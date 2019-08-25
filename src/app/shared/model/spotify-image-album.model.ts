export interface ISpotifyImageAlbum {
  height?: number;
  url?: string;
  width?: number;
}

export class SpotifyImageAlbum implements ISpotifyImageAlbum {
  constructor(
    public height?: number,
    public url?: string,
    public width?: number
  ) {}
}
