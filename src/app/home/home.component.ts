import { Component, OnInit } from '@angular/core';
import {LoginService} from '../authentication/login/login.service';
import {SpotifyService} from '../shared/services/spotify.service';
import {HttpResponse} from '@angular/common/http';
import {ISpotifyUser} from '../shared/model/spotify-user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.spotifyService.getCurrentSpotifyUser().subscribe((res: HttpResponse<ISpotifyUser>) => {
      console.log(res);
    });
  }

  logout() {
    this.loginService.logout();
  }

}
