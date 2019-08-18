import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../core/auth/account.service';
import {IUser} from '../shared/model/user.model';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../authentication/login/login.service';
import {HAS_SESSION} from '../shared/constants/cookie.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private cookieService: CookieService,
    private loginService: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {

    // CHECK FIRST IF THERE IS A SESSION COOKIE

    if (this.cookieService.check(HAS_SESSION)) {
      return this.accountService.identify().then((account: IUser) => {
        if (account) {
          // validate by authorities

          // validate if user have spotify tokens
          if (account.hasToken) {
            return true;
          } else {
            this.router.navigateByUrl('/authenticate/connect-spotify');
            return false;
          }
        }
        this.loginService.logout();
        return false;
      }, (rejected: any) => {
        this.loginService.logout();
        return false;
      });
    } else {
      this.loginService.logout();
      return Promise.resolve(false);
    }
  }
}
