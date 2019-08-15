import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../core/auth/account.service';
import {IUser} from '../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkLogin();
  }

  checkLogin(): Promise<boolean> {

    // CHECK FIRST IF THERE IS A SESSION COOKIE
    // CONFIGURE NGINX SERVER TO REDIRECT TRAFFIC TO ROUTES OTHERS THAN /api/ and /

    return this.accountService.identify().then((account: IUser) => {
      if (account) {
        // validate by authorities
        return true;
      }

      this.router.navigateByUrl('/authenticate/login');
      return false;
    }, (rejected: any) => {
      this.router.navigateByUrl('/authenticate/login');
      return false;
    });
  }
}
