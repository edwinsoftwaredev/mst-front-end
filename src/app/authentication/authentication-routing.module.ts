import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SpotifyAuthenticationComponent} from './spotify-authentication/spotify-authentication.component';


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
        data: {animation: 'login'}
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {animation: 'register'}
      },
      {
        path: 'connect-spotify',
        component: SpotifyAuthenticationComponent,
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
