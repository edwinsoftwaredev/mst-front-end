import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL, SPOTIFY_AUTH_URL} from '../../shared/app-constants';
import {LoginService} from '../login/login.service';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) { }

  /**
   * method to get the spotify client id
   */
  getClientId(): Observable<HttpResponse<string>> {
    return this.httpClient.get<string>(SERVER_API_URL + 'api/client-id', {observe: 'response'});
  }

  // method to iniatilize the spotify authentication
  spotifyAuthStart() {
    this.getClientId().subscribe((res: HttpResponse<string>) => {
      if (res.body) {

        // if client id is returned then:
        this.spotifyAuth(res.body);

      } else {
        this.snackBar.open('There was an error. Try later. 🗨', '', {duration: 5000});
        this.loginService.logout();
      }
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
      this.snackBar.open('There was an error. Try later. 🗨', '', {duration: 5000});
      this.loginService.logout();
    });
  }

  private spotifyAuth(clientId: string) {

    const stateToken = btoa(btoa(this.tokenExtractor.getToken().replace('-', '')));

    this.httpClient.get(
      SPOTIFY_AUTH_URL,
      {
        params: {
          client_id: clientId,
          response_type: 'code',
          redirect_uri: 'https://plugtify.com/authenticate/connect-spotify',
          state: stateToken,
          scope: 'user-read-private user-read-email'
        }
      }
    ).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.loginService.logout();
    });

  }
}
