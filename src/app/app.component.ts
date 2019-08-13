import { Component } from '@angular/core';
import {CsrfTokenService} from './shared/services/csrf-token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Plugtify';

  // testing getCsrfToken
  constructor(private csrfToken: CsrfTokenService) {
    this.csrfToken.isTokenPresent().then((res: any) => {
      console.log(res);
    }, (reason: any) => {
      console.log(reason);
    }).catch((reason: any) => {
      console.log(reason);
    });
  }
}
