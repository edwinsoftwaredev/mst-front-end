import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../shared/app-constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpClient: HttpClient) { }

  registerUser(account: any): Observable<any> {
    return this.httpClient.post(SERVER_API_URL + 'api/account', account, {observe: 'response'});
  }
}
