import { Component, OnInit } from '@angular/core';
import {LoginService} from '../authentication/login/login.service';
import {SpotifyService} from '../shared/services/spotify.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {AccountService} from '../core/auth/account.service';
import {ISpotifyTrack} from '../shared/model/spotify-track.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    /*this.accountService.identify().then((user: IUser) => {
      if (user) {
        this.spotifyService.getCurrentSpotifyUser().subscribe((res: HttpResponse<ISpotifyUser>) => {
          console.log(res);
        }, error => {
          console.log(error);
          this.loginService.logout();
        });
      }
    }, (reason: any) => {
      this.loginService.logout();
    });*/
  }

  logout() {
    this.loginService.logout();
  }
}
