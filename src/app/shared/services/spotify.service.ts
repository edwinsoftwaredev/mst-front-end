import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AccountService} from '../../core/auth/account.service';
import {ISpotifyUser} from '../model/spotify-user.model';
import {Observable, of} from 'rxjs';
import {LoginService} from '../../authentication/login/login.service';
import {SERVER_API_URL} from '../app-constants';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private spotifyUser: HttpResponse<ISpotifyUser>;

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService
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
}
