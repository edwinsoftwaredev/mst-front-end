import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../shared/services/spotify.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ISpotifyTrack} from '../../shared/model/spotify-track.model';

@Component({
  selector: 'app-suggested-playlist',
  templateUrl: './suggested-playlist.component.html',
  styleUrls: ['./suggested-playlist.component.scss']
})
export class SuggestedPlaylistComponent implements OnInit {

  suggestedTracks: Array<ISpotifyTrack> = [];

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.getSuggestedTracks();
  }

  getSuggestedTracks() {
    this.spotifyService.getSuggestedPlaylist().subscribe((res: HttpResponse<Array<ISpotifyTrack>>) => {
      if (res.body.length !== 0) {
        this.suggestedTracks = res.body;
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
