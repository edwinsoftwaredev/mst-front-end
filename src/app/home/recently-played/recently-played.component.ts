import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ISpotifyTrack} from '../../shared/model/spotify-track.model';
import {SpotifyService} from '../../shared/services/spotify.service';

@Component({
  selector: 'app-recently-played',
  templateUrl: './recently-played.component.html',
  styleUrls: ['./recently-played.component.scss']
})
export class RecentlyPlayedComponent implements OnInit {

  recentlyPlayedTracks: Array<ISpotifyTrack> = [];

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
  }

  getRecentlyPlayedTracks() {
    this.spotifyService.getRecentlyPlayedTracks().subscribe((res: HttpResponse<Array<ISpotifyTrack>>) => {
      if (res.body) {
        this.recentlyPlayedTracks = res.body;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
