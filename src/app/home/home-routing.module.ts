import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {HomeGuard} from './home.guard';
import {SuggestedPlaylistComponent} from './suggested-playlist/suggested-playlist.component';
import {RecentlyPlayedComponent} from './recently-played/recently-played.component';
import {MakePlaylistComponent} from './make-playlist/make-playlist.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuard],
    children: [{
      path: '',
      component: SuggestedPlaylistComponent,
      pathMatch: 'full'
    }, {
      path: 'recently-played',
      component: RecentlyPlayedComponent
    }, {
      path: 'make-playlist',
      component: MakePlaylistComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
