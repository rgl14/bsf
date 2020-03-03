import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = "http://www.gamex247.net/Admin/Admin.svc";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Login(data): Observable<any> {
    return this.http.post(`${BASEURL}/Login`, data)
  }
  Logout(): Observable<any> {
    return this.http.post(`${BASEURL}/Logout`, {});
  }
  
}
