import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../../shared/app-constants';
import {AccountService} from '../../core/auth/account.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private tryLogin: Subject<boolean> = new Subject<boolean>();
  tryLoginObserver: Observable<boolean> = this.tryLogin.asObservable();

  constructor(
    private httpClient: HttpClient,
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { }

  /**
   * Method to authenticate a user
   * @param credentials --> username and password object
   * @param callback return function
   */
  authenticate(credentials: any, callback: any) {

    this.tryLogin.next(true);

    // BASIC authentication token Http Header
    const headerAuthenticationToken = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.httpClient.get(SERVER_API_URL + 'api/user', {headers: headerAuthenticationToken, observe: 'response'})
      .subscribe((res: HttpResponse<any>) => {

        if (res.body) {
          this.accountService.identify(true).then(() => {
            this.router.navigateByUrl('/home');
            this.tryLogin.next(false);
          }, (rejected: any) => {
            this.router.navigateByUrl('/authenticate/login');
            this.snackBar.open('There was an error while trying to log in. Try later. 🗨', '', {duration: 5000});
            this.tryLogin.next(false);
          });
        } else {
          this.logout();
          this.snackBar.open('There was an error while trying to log in. Try later. 🗨', '', {duration: 5000});
          this.tryLogin.next(false);
        }

        return callback && callback();
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 0) {
          this.snackBar.open('There was an error while trying to log in. Try later. 🗨', '', {duration: 5000});
          this.tryLogin.next(false);
        } else {
          this.snackBar.open('Failed to log in! Please check your credentials and try again. 🗨', '', {duration: 5000});
          this.tryLogin.next(false);
        }
      });
  }

  /**
   * method to logout a user.
   *
   * This method make a request to the endpoint logout wich is the default endpoint in
   * Spring, with Basic Authentication, to logout a user.
   */
  logout() {
    this.httpClient
      .post(SERVER_API_URL + 'api/logout', {}, {observe: 'response'})
      .subscribe((response) => {
        this.cookieService.delete('USER-HAS-SESSION');
        this.accountService.authenticate(null);
        this.router.navigateByUrl('/authenticate/login');
      });
  }
}
