import { Injectable } from '@angular/core';
import {CredentialsType} from '../types/credentials.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  localStorageKey = 'authedKey';

  isUserAuthenticated() {
    const authed = localStorage.getItem(this.localStorageKey);

    if (authed) {
      return true;
    } else {
      return false;
    }
  }


  authenticateUser(credentials: CredentialsType) {

    // Just a value. No authentication login applied
    return localStorage.setItem(this.localStorageKey, 'true');
  }

  logoutUser() {
    return localStorage.removeItem(this.localStorageKey);
  }
}
