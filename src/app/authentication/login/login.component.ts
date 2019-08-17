import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from './login.service';
import {CsrfTokenService} from '../../shared/services/csrf-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  tryLogin: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private csrfTokenService: CsrfTokenService
  ) {
    this.csrfTokenService.isTokenPresent();
  }

  ngOnInit() {
  }

  login(): void {
    // do login
      // check if user have Spotify tokens

    this.tryLogin = true;

    if (this.username.length !== 0 && this.password.length !== 0) {
      const credentials = {
        username: this.username.trim(),
        password: this.password.trim()
      };

      this.loginService.authenticate(credentials, () => {
        this.tryLogin = false;
      });
    }
  }

  swithRegister(): void {
    this.router.navigate(['../register'], {
      relativeTo: this.route
    });
  }
}
