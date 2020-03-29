import { Component } from '@angular/core';
import {LoginService} from './services/login.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'basic-frond-end';

  constructor(
      private loginService: LoginService,
      private _router: Router,
  ) {}

  isAuthenticated() {
    return this.loginService.isUserAuthenticated();
  }

  logoutUser() {
    this.loginService.logoutUser();
    this._router.navigate(['/login']);
  }
}
