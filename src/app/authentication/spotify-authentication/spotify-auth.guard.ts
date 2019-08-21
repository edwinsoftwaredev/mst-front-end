import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../../core/auth/account.service';
import {IUser} from '../../shared/model/user.model';
import {LoginService} from '../login/login.service';
import {HAS_SESSION} from '../../shared/constants/cookie.constants';
import {HttpXsrfTokenExtractor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private loginService: LoginService,
    private tokenExtractor: HttpXsrfTokenExtractor
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (Object.entries(next.queryParams).length !== 0 && next.queryParams.constructor === Object) {
      return this.accountService.identify().then((user: IUser) => {
        if (user) {
          if (!user.hasToken) {
            if (next.queryParams.code) {
              const checkState = btoa(btoa(this.tokenExtractor.getToken().replace('-', '').substr(0, 10)));
              if (next.queryParams.state === checkState) {
                // success: here is where the spotify code needs to be send to the backend
                this.router.navigateByUrl('/home');
                return false;
              } else {
                this.loginService.logout();
                return false;
              }
            } else if (next.queryParams.error) {
              console.log(next.queryParams.error);
              this.loginService.logout();
              return false;
            } else {
              this.loginService.logout();
              return false;
            }
          } else {
            this.loginService.logout();
            return false;
          }
        } else {
          this.loginService.logout();
          return false;
        }
      });
    }

    if (!sessionStorage.getItem(HAS_SESSION)) {
      this.loginService.logout();
      return Promise.resolve(false);
    }

    return this.accountService.identify().then((user: IUser) => {
      if (user) {

        if (!user.hasToken) {
          // The user has not connected this application with Spotify
          return true;
        } else {
          // The user has the tokens
          this.router.navigateByUrl('/home');
          return false;
        }

      } else {
        this.loginService.logout();
        return false;
      }
    });
  }
}
