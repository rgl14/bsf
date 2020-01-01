import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = "http://173.249.43.228/BSF777Adm/Admin.svc";
@Injectable({
  providedIn: 'root'
})
export class UserrolesService {

  constructor(private http : HttpClient) { }
  AddRole(data): Observable<any> {
    return this.http.post(`${BASEURL}/Roles/AddRole`, data);
  }
  EditRole(data): Observable<any> {
    return this.http.post(`${BASEURL}/Roles/EditRole`, data);
  }
  GetRoleInfobyId(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Roles/GetRoleInfobyId?id=${ID}`);
  }
  GetRoles(): Observable<any> {
    return this.http.get(`${BASEURL}/Roles/GetRoles`);
  }
  GetRoleInfobyUserId(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Roles/GetRoleInfobyUserId`);
  }
  GetRolesList(): Observable<any> {
    return this.http.get(`${BASEURL}/Roles/GetRolesList`);
  }
}
