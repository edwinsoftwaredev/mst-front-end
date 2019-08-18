import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SpotifyAuthenticationComponent} from './spotify-authentication/spotify-authentication.component';
import {SpotifyAuthGuard} from './spotify-authentication/spotify-auth.guard';
import {RegisterGuard} from './register/register.guard';
import {LoginGuard} from './login/login.guard';


const routes: Routes = [
  {
    path: 'authenticate',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
        data: {animation: 'login'}
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [RegisterGuard],
        data: {animation: 'register'}
      },
      {
        path: 'connect-spotify',
        component: SpotifyAuthenticationComponent,
        canActivate: [SpotifyAuthGuard],
        data: {animation: 'connectSpotify'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
