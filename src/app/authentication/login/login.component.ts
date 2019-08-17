import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './login.service';
import {CsrfTokenService} from '../../shared/services/csrf-token.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string;
  password: string;
  tryLogin: boolean;
  tryLoginSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private csrfTokenService: CsrfTokenService
  ) {
    this.csrfTokenService.isTokenPresent();
  }

  ngOnInit() {
    this.tryLoginSubscription = this.loginService.tryLoginObserver.subscribe((value: boolean) => {
      this.tryLogin = value;
    });
  }

  ngOnDestroy(): void {
    this.tryLoginSubscription.unsubscribe();
  }

  login(): void {
    // do login
      // check if user have Spotify tokens

    if (this.username.length !== 0 && this.password.length !== 0) {
      const credentials = {
        username: this.username.trim(),
        password: this.password.trim()
      };

      this.loginService.authenticate(credentials, () => {
        // do something
      });
    }
  }

  swithRegister(): void {
    this.router.navigate(['../register'], {
      relativeTo: this.route
    });
  }
}
