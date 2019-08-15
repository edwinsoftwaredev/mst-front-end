import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {loginRegisterAnimation} from './animations';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  animations: [loginRegisterAnimation]
})
export class AuthenticationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRoute && outlet.activatedRouteData.animation;
  }
}
