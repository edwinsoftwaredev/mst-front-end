import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../login/login.service';

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
    private loginService: LoginService) { }

  ngOnInit() {
  }

  logout() {
    // this.loginService.logout();
    this.router.navigate(['../login'], {relativeTo: this.route});
  }
}
