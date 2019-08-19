import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../../core/auth/account.service';
import {IUser} from '../../shared/model/user.model';
import {LoginService} from '../login/login.service';
import {HAS_SESSION} from '../../shared/constants/cookie.constants';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private loginService: LoginService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

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
