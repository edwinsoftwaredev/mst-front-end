import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import {AccountService} from '../../core/auth/account.service';
import {IUser} from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthGuardGuard implements CanActivate {

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

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
        this.router.navigate(['../login'], {relativeTo: this.route});
        return false;
      }
    });
  }

}
