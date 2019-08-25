export interface ISpotifyExternalUrl {
  spotify?: string;
}

export class SpotifyExternalUrl implements ISpotifyExternalUrl{
  constructor(
    public spotify?: string
  ) {}
}
