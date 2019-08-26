import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AccountService} from '../../core/auth/account.service';
import {ISpotifyUser} from '../model/spotify-user.model';
import {Observable, of} from 'rxjs';
import {SERVER_API_URL} from '../app-constants';
import {map} from 'rxjs/operators';
import {ISpotifyTrack} from '../model/spotify-track.model';
import * as moment from 'moment';
import {ISpotifyArtist} from '../model/spotify-artist.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private spotifyUser: HttpResponse<ISpotifyUser>;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCurrentSpotifyUser(): Observable<HttpResponse<ISpotifyUser>> {

    if (this.spotifyUser) {
      return of(this.spotifyUser);
    }

    return this.httpClient.get<ISpotifyUser>(SERVER_API_URL + 'api/current-user', {observe: 'response'})
      .pipe(map((res: HttpResponse<ISpotifyUser>) => {
        this.spotifyUser = res;
        return res;
      }));
  }

  getRecentlyPlayedTracks(): Observable<HttpResponse<Array<ISpotifyTrack>>> {
    return this.httpClient
      .get<Array<ISpotifyTrack>>(SERVER_API_URL + 'api/recently-played', {observe: 'response'})
      .pipe(map((trackArrayRes: HttpResponse<Array<ISpotifyTrack>>) => {

        // convert millisecond to minutes and seconds
        // get Artists as a String
        if (trackArrayRes.body) {
          trackArrayRes.body.forEach((track: ISpotifyTrack) => {
            track.duration_ms = this.getTimeTrack(track.duration_ms as number); // from backend we get a "number"
            track.artists = (track.artists as Array<ISpotifyArtist>).join(', ') as string;
            // we get a string with the artist separeted with a ,. from backen we get an array of artists
            return track;
          });
        }

        return trackArrayRes;
      }));
  }

  getTimeTrack(timeMilliseconds: number): string {
    return moment.duration(timeMilliseconds, 'milliseconds').minutes() + ':' + moment.duration(timeMilliseconds, 'milliseconds').seconds();
  }

  clearSpotifyUser(): void {
    this.spotifyUser = null;
  }
}
