import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CsrfTokenService} from '../../shared/services/csrf-token.service';
import {MatSnackBar} from '@angular/material';
import {AccountService} from '../../core/auth/account.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from '../../shared/constants/error.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  account: any = {};
  confirmPassword: string;
  showProgressBar: boolean;
  enableSignButton = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private csrfToken: CsrfTokenService,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {
    this.csrfToken.isTokenPresent();
  }

  ngOnInit() {
  }

  register(): void {
    if (this.account.password === this.confirmPassword) {
      this.showProgressBar = true;
      this.enableSignButton = false;

      this.account.username = this.account.username.toLowerCase();

      this.accountService.registerUser(this.account).subscribe((res: HttpResponse<any>) => {
        this.showProgressBar = false;
        this.snackBar.open('You have Registered! 🎉🎉🎉', '', {duration: 2500})
          .afterDismissed()
          .subscribe(() => {
            this.snackBar.open('Now you can Login!', '', {duration: 4000});
            this.switchLogin();
          });
      }, ((errorResponse: HttpErrorResponse) => {

        if (errorResponse.status === 0) {
          this.snackBar.open('An error occurred while trying to register. Try later. 🗨', '', {duration: 5000});
        } else if (errorResponse.status === 400 && errorResponse.error.type === LOGIN_ALREADY_USED_TYPE) {
          this.snackBar.open(errorResponse.error.title + '🤦‍♀️', '', {duration: 5000});
        } else if (errorResponse.status === 400 && errorResponse.error.type === EMAIL_ALREADY_USED_TYPE) {
          this.snackBar.open(errorResponse.error.title + '🤦‍♀️', '', {duration: 5000});
        } else {
          this.snackBar.open(errorResponse.status.toString(), '', {duration: 5000});
        }

      }), () => {
        this.showProgressBar = false;
      });
    }
  }

  switchLogin() {
    this.router.navigate(['../login'], {
      relativeTo: this.route
    });
  }
}
