import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpXsrfTokenExtractor} from '@angular/common/http';
import {SERVER_API_URL} from '../app-constants';
import {map} from 'rxjs/operators';

/**
 * Class to request a csrf token
 */

@Injectable({
  providedIn: 'root'
})
export class CsrfTokenService {

  constructor(
    private httpClient: HttpClient,
    private tokenExtractor: HttpXsrfTokenExtractor) { }

  private getCsrfToken(): Promise<any> {
    return this.httpClient.get<any>(SERVER_API_URL + 'api/csrf-token', {observe: 'response'})
      .pipe(map((res: HttpResponse<any>) => res.body.token))
      .toPromise();
  }

  isTokenPresent(): Promise<any> {
    const token = this.tokenExtractor.getToken();

    if (token) {
      return Promise.resolve(token);
    } else {
      return this.getCsrfToken();
    }
  }
}
