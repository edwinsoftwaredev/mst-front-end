import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../core/auth/account.service';
import {IUser} from '../shared/model/user.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private cookieService: CookieService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {

    // CHECK FIRST IF THERE IS A SESSION COOKIE

    if (this.cookieService.check('USER-HAS-SESSION')) {
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
        this.router.navigateByUrl('/authenticate/login');
        return false;
      }, (rejected: any) => {
        this.router.navigateByUrl('/authenticate/login');
        return false;
      });
    } else {
      this.router.navigateByUrl('/authenticate/login');
      return Promise.resolve(false);
    }
  }
}
