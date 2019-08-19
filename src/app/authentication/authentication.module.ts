import { NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {AuthenticationComponent} from './authentication.component';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpotifyAuthenticationComponent } from './spotify-authentication/spotify-authentication.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
    SpotifyAuthenticationComponent
  ],
  imports: [
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
