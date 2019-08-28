import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarDismiss} from '@angular/material';
import {AccountService} from '../core/auth/account.service';
import {LoginService} from '../authentication/login/login.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private accountService: AccountService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  deleteAccount() {
    this.snackbar.open('Are you sure you want to delete you account?', 'Yes', {duration: 5000})
      .onAction().subscribe(() => {

        this.accountService.delete().then(() => {
          this.loginService.logout();
          this.snackbar.open('Account Deleted', '', {duration: 1000});
        }, (error: HttpErrorResponse) => {
          this.loginService.logout();
          this.snackbar.open('There was a problem while trying to delete your account. Try later.', '', {duration: 5000});
        });
      });
  }
}
