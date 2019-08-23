import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {AccountService} from '../../core/auth/account.service';
import {ISpotifyUser} from '../model/spotify-user.model';
import {Observable} from 'rxjs';
import {LoginService} from '../../authentication/login/login.service';
import {SERVER_API_URL} from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService,
    private loginService: LoginService
  ) { }

  getCurrentSpotifyUser(): Observable<HttpResponse<ISpotifyUser>> {
    if (this.accountService.isUserAuthenticated()) {
      this.loginService.logout();
    }

    return this.httpClient.get<ISpotifyUser>(SERVER_API_URL + 'api/current-user', {observe: 'response'});
  }
}
