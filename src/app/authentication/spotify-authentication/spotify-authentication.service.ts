import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL, SPOTIFY_AUTH_URL} from '../../shared/app-constants';
import {LoginService} from '../login/login.service';
import {MatSnackBar} from '@angular/material';
import {Router, UrlSerializer} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthenticationService {

  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private router: Router,
    private urlSerializer: UrlSerializer
  ) { }

  /**
   * method to get the spotify client id
   */
  getClientId(): Observable<HttpResponse<any>> {
    return this.httpClient.get(SERVER_API_URL + 'api/client-id', {observe: 'response'});
  }

  // method to iniatilize the spotify authentication
  spotifyAuthStart() {
    this.getClientId().subscribe((res: HttpResponse<any>) => {

      console.log(res);

      if (res.body) {

        // if client id is returned then:
        this.spotifyAuth(res.body.clientId);

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

    const stateToken = btoa(btoa(this.tokenExtractor.getToken().replace('-', '').substr(0, 10)));

    const routeToSpotify = this.router.createUrlTree([SPOTIFY_AUTH_URL], {
      queryParams: {
        client_id: clientId,
        response_type: 'code',
        redirect_uri: 'https://plugtify.com/authenticate/connect-spotify',
        state: stateToken,
        scope: 'user-read-private user-read-email'
      },
      relativeTo: null
    });

    window.location.href = this.urlSerializer.serialize(routeToSpotify);

  }
}
