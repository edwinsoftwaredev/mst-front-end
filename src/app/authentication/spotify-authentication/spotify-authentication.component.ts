import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login/login.service';
import {SpotifyAuthenticationService} from './spotify-authentication.service';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private spotifyAuthenticationService: SpotifyAuthenticationService
  ) { }

  ngOnInit() { }

  openSpotifyAuth() {
    console.log('click');
    this.spotifyAuthenticationService.spotifyAuthStart();
  }

  logout() {
    this.loginService.logout();
  }
}
