import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token) {
    this.cookieService.set('AuthToken', token);
  }
  getToken() {
    return this.cookieService.get('AuthToken');
  }
  removeToken() {
    this.cookieService.delete('AuthToken');
    window.location.href = "";
  }

  setUserType(UserType) {
    this.cookieService.set('UserType', UserType);
  }
  getUserType() {
    return this.cookieService.get('UserType');
  }
  removeUserType() {
    this.cookieService.delete('UserType');
  }
}
