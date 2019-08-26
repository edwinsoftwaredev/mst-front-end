import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {AppModule} from '../app.module';
import {MatListModule} from '@angular/material';
import { RecentlyPlayedComponent } from './recently-played/recently-played.component';
import { SuggestedPlaylistComponent } from './suggested-playlist/suggested-playlist.component';
import { MakePlaylistComponent } from './make-playlist/make-playlist.component';

@NgModule({
  declarations: [
    HomeComponent,
    RecentlyPlayedComponent,
    SuggestedPlaylistComponent,
    MakePlaylistComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatListModule
  ]
})
export class HomeModule { }
