import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = "http://173.249.43.228/BSF777Adm/Admin.svc";

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
