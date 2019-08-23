export interface ISpotifyUserImage {
  height?: number;
  url?: string;
  width?: number;
}

export class SpotifyUserImage implements ISpotifyUserImage{
  constructor(
    public height?: number,
    public url?: string,
    public width?: number
  ) { }
}

