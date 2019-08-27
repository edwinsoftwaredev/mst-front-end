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
    this.getRecentlyPlayedTracks();
  }

  goTrack(url: string) {
    window.open(url, '_blank');
  }

  getRecentlyPlayedTracks() {
    this.spotifyService.getRecentlyPlayedTracks().subscribe((res: HttpResponse<Array<ISpotifyTrack>>) => {
      if (res.body.length !== 0) {
        this.recentlyPlayedTracks = res.body.slice(0, 40);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
