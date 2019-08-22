import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../core/auth/account.service';
import {IUser} from '../shared/model/user.model';
import {LoginService} from '../authentication/login/login.service';
import {HAS_SESSION} from '../shared/constants/cookie.constants';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private loginService: LoginService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {

    // CHECK FIRST IF THERE IS A SESSION COOKIE

    if (sessionStorage.getItem(HAS_SESSION)) {
      // force is set to true to get the token related to the user
      return this.accountService.identify(true).then((account: IUser) => {
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
