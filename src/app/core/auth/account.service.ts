import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../shared/app-constants';
import {Observable} from 'rxjs';
import {IUser} from '../../shared/model/user.model';
import {CookieService} from 'ngx-cookie-service';
import {HAS_SESSION} from '../../shared/constants/cookie.constants';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private user: IUser;
  private userAuthenticated: boolean;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  /**
   * Method to register a User
   * @param account to register -> login, email, password
   */
  registerUser(account: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(SERVER_API_URL + 'api/register', account, {observe: 'response'});
  }

  /**
   * Method to get the current logged user
   */
  fetch(): Observable<HttpResponse<IUser>> {
    return this.httpClient.get<IUser>(SERVER_API_URL + 'api/account', {observe: 'response'});
  }

  /**
   * Method to reset the user authenticated
   * @param user: user to make the reset
   */
  authenticate(user) {
    this.user = user;
    this.userAuthenticated = this.user !== null;
  }

  /**
   * Method to identify if a user is authenticated
   * @param force -> force to identify if user is authenticated in backend
   */
  identify(force?: boolean): Promise<IUser> {
    if (force) {
      this.user = undefined;
    }

    if (this.user) {
      return Promise.resolve(this.user);
    }

    return this.fetch().toPromise().then((res: HttpResponse<IUser>) => {
      const userAccount = res.body;

      if (userAccount) {
        this.user = userAccount;
        this.userAuthenticated = true;

        if (!this.cookieService.check(HAS_SESSION)) {
          this.cookieService.set(HAS_SESSION, '1');
        }
      } else {
        this.cookieService.delete(HAS_SESSION);
        this.user = null;
        this.userAuthenticated  = false;
      }

      return this.user;
    }, (rejected: any) => {
      this.cookieService.delete(HAS_SESSION);
      this.user = null;
      this.userAuthenticated = false;
      return this.user;
    });
  }
}
