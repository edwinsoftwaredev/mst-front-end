import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login/login.service';
import {SpotifyAuthenticationService} from './spotify-authentication.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-spotify-authentication',
  templateUrl: './spotify-authentication.component.html',
  styleUrls: ['./spotify-authentication.component.scss']
})
export class SpotifyAuthenticationComponent implements OnInit {

  private clienId: string;

  /**
   * this component needs a canActivate guard to ensure that it can be access
   * only when user is authenticated
   */

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private spotifyAuthenticationService: SpotifyAuthenticationService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.spotifyAuthenticationService.getClientId().subscribe((res: HttpResponse<string>) => {
      if (res.body) {
        this.clienId = res.body;
      } else {
        this.snackBar.open('There was an error. Try later. 🗨', '', {duration: 5000});
        this.loginService.logout();
      }
    }, (error: HttpErrorResponse) => {
      console.log(error.message);
      this.snackBar.open('There was an error. Try later. 🗨', '', {duration: 5000});
      this.loginService.logout();
    });
  }

  logout() {
    this.loginService.logout();
  }
}
