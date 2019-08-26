export interface ISpotifyArtist {
  id?: string;
  name?: string;
  type?: string;
}

export class SpotifyArtist implements ISpotifyArtist {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string
  ) {}
}
