export interface ISpotifyArtist {
  id?: string;
  name?: string;
  type?: string;
  uri?: string;
}

export class SpotifyArtist implements ISpotifyArtist {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string,
    public uri?: string
  ) {}
}
