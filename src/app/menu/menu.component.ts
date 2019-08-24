import { Component, OnInit } from '@angular/core';
import {ISpotifyUser, SpotifyUser} from '../shared/model/spotify-user.model';
import {SpotifyService} from '../shared/services/spotify.service';
import {HttpResponse} from '@angular/common/http';
import {SpotifyUserImage} from '../shared/model/spotify-user-image.model';
import {LoginService} from '../authentication/login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  spotifyUser: ISpotifyUser;

  constructor(
    private spotifyService: SpotifyService,
    private loginService: LoginService
  ) {
    this.spotifyService.getCurrentSpotifyUser().subscribe((res: HttpResponse<ISpotifyUser>) => {
      if (res.body) {
        this.spotifyUser = res.body;
      } else {
        this.spotifyUser = new SpotifyUser('US',
          'user',
          null,
          '',
          '',
          [new SpotifyUserImage(0, '', 0)]);
      }
    }, (error: any) => {
      // for test only
      this.spotifyUser = new SpotifyUser('US',
        'user',
        null,
        '',
        '',
        [new SpotifyUserImage(0, '', 0)]);
    });
  }

  ngOnInit() {
  }

  logout() {
    // clear spotify user
    this.spotifyUser = null;
    this.loginService.logout();
  }

}
