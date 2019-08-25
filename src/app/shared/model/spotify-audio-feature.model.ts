export interface ISpotifyAudioFeature {
  acousticness?: number;
  danceability?: number;
  energy?: number;
  id?: string;
  instrumentalness?: number;
  liveness?: number;
  speechiness?: number;
  tempo?: number;
  type?: string;
  valence?: number;
}

export class SpotifyAudioFeature implements ISpotifyAudioFeature {
  constructor(
    public acousticness?: number,
    public danceability?: number,
    public energy?: number,
    public id?: string,
    public instrumentalness?: number,
    public liveness?: number,
    public speechiness?: number,
    public tempo?: number,
    public type?: string,
    public valence?: number
  ) {}
}
