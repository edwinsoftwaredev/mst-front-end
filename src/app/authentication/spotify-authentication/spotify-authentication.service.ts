import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../shared/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  /**
   * method to get the spotify client id
   */
  getClientId(): Observable<HttpResponse<string>> {
    return this.httpClient.get<string>(SERVER_API_URL + 'api/client-id', {observe: 'response'});
  }
}
