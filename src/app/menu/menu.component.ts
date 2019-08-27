import { Component, OnInit } from '@angular/core';
import {ISpotifyUser, SpotifyUser} from '../shared/model/spotify-user.model';
import {SpotifyService} from '../shared/services/spotify.service';
import {HttpResponse} from '@angular/common/http';
import {SpotifyUserImage} from '../shared/model/spotify-user-image.model';
import {LoginService} from '../authentication/login/login.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  spotifyUser: ISpotifyUser;

  constructor(
    private spotifyService: SpotifyService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
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
          []);
      }
    }, (error: any) => {
      // for test only
      this.spotifyUser = new SpotifyUser('US',
        'user',
        null,
        '',
        '',
        []);
    });
  }

  ngOnInit() {
  }

  goHome(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  goRecentlyPlayed(): void {
    this.router.navigate(['home/recently-played'], {relativeTo: this.route});
  }

  goMakePlaylist(): void {
    this.router.navigate(['home/make-playlist'], {relativeTo: this.route});
  }

  logout() {
    this.loginService.logout();
  }

}
