import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  login(): void {
    // do login
      // check if user have Spotify tokens

    this.router.navigate(['../connect-spotify'], {relativeTo: this.route});
  }

  swithRegister(): void {
    this.router.navigate(['../register'], {
      relativeTo: this.route
    });
  }
}
