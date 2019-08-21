import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login/login.service';
import {SpotifyAuthenticationService} from './spotify-authentication.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-spotify-authentication',
  templateUrl: './spotify-authentication.component.html',
  styleUrls: ['./spotify-authentication.component.scss']
})
export class SpotifyAuthenticationComponent implements OnInit {

  /**
   * this component needs a canActivate guard to ensure that it can be access
   * only when user is authenticated
   */

  btnConnectSpotifyEnable = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private spotifyAuthenticationService: SpotifyAuthenticationService
  ) { }

  ngOnInit() {
    // get authorization code if present
    if (this.route.snapshot.queryParams.code) {
      this.btnConnectSpotifyEnable = false;

      this.spotifyAuthenticationService
        .processCode(this.route.snapshot.queryParams.code)
        .subscribe((res: HttpResponse<any>) => {
          if (res.ok) {
            this.router.navigateByUrl('/home');
          } else {
            this.logout();
          }
        }, (error: HttpErrorResponse) => {
          console.log(error);
          this.logout();
        });
    }
  }

  openSpotifyAuth() {
    this.spotifyAuthenticationService.spotifyAuthStart();
  }

  logout() {
    this.loginService.logout();
  }
}
