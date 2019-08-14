import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../shared/app-constants';
import {Observable} from 'rxjs';
import {IUser} from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) { }

  /**
   * Method to register a User
   * @param account to register -> login, email, password
   */
  registerUser(account: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(SERVER_API_URL + 'api/account', account, {observe: 'response'});
  }

  /**
   * Method to get the current logged user
   */
  fetch(): Observable<HttpResponse<IUser>> {
    return this.httpClient.get<IUser>(SERVER_API_URL + 'api/account', {observe: 'response'});
  }
}
