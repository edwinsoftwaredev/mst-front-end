import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL, SPOTIFY_AUTH_URL} from '../../shared/app-constants';
import {LoginService} from '../login/login.service';
import {MatSnackBar} from '@angular/material';
import {Router, UrlSerializer} from '@angular/router';
import {AuthorizationCode} from '../../shared/model/authorization-code.model';

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

  // send spotify code to be process
  processCode(code: string): Observable<HttpResponse<any>> {
    const authCode: AuthorizationCode =
      new AuthorizationCode('authorization_code', code, 'https://plugtify.com/authenticate/connect-spotify');

    return this.httpClient.post(SERVER_API_URL + 'api/authorization-code', authCode, {observe: 'response'});
  }

  private spotifyAuth(clientId: string) {

    const stateToken = btoa(btoa(this.tokenExtractor.getToken().replace('-', '').substr(0, 10)));

    const clientIdString = 'client_id=' + clientId;
    const responseTypeString = 'response_type=' + 'code';
    const redirectURIString = 'redirect_uri=' + 'https://plugtify.com/authenticate/connect-spotify';
    const scopeString = 'scope=' + 'user-read-private';
    const stateString = 'state=' + stateToken;

    window.location.href = SPOTIFY_AUTH_URL + '?' +
      clientIdString + '&' +
      responseTypeString + '&' +
      redirectURIString + '&' +
      scopeString + '&' +
      stateString;

  }
}
