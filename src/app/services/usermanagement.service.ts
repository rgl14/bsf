import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ReturnStatement } from "@angular/compiler";
import { CookieService } from 'ngx-cookie-service';

const BASEURL = "http://173.249.43.228/BSF777Adm/Admin.svc";
@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(private http: HttpClient,private cookieService: CookieService) {}

  changePassword(data): Observable<any> {
    return this.http.post(`${BASEURL}/ChangePwd`, data);
  }

  Logout(data): Observable<any> {
    return this.http.post(`${BASEURL}/Logout`, data);
  }

  getUserType(){
    return this.cookieService.get('UserType');
  }

  getUserlist(userid): Observable<any> {
    return this.http.get(`${BASEURL}/Usermanagement/Userlist?type=${userid}`);
  }

  GetNextUsername(usertype): Observable<any> {
    return this.http.get(`${BASEURL}/Usermanagement/GetNextUsername?type=${usertype}`);
  }

  getUserStatusUpdate(userId, status, isall): Observable<any> {
    return this.http.post(
      `${BASEURL}/Usermanagement/UpdateUserStatus?userid=${userId}&status=${status}&isall=${isall}`,
      {}
    );
  }

  getCreatUser(data: any): Observable<any> {
    return this.http.post(`${BASEURL}/Usermanagement/AddUser`, data);
  }
  getAddTicker(data: any): Observable<any> {
    return this.http.post(`${BASEURL}/NewsTicker/AddTicker`, data);
  }

  getDeleteTicker(IDS): Observable<any> {
    return this.http.post(`${BASEURL}/NewsTicker/DeleteTicker?ids=${IDS}`, {});
  }

  getTickerList(): Observable<any> {
    return this.http.get(`${BASEURL}/NewsTicker/GetTickerList`);
  }

  getUpdateTicker(data: any): Observable<any> {
    return this.http.post(`${BASEURL}/NewsTicker/UpdateTicker`, data);
  }

  getUpdateTickerStatus(ID: number, STATUS: any): Observable<any> {
    return this.http.post(
      `${BASEURL}/NewsTicker/UpdTickerStatus?id=${ID}&status=${STATUS}`,
      {}
    );
  }

  getUpdateBettingStatus(flag): Observable<any> {
    return this.http.post(
      `${BASEURL}/Settings/UpdateBettingStatus?flag=${flag}`,
      {}
    );
  }

  getUserInfo(id): Observable<any> {
    return this.http.get(`${BASEURL}/Usermanagement/UserInfo?id=${id}`);
  }

  getEditUserData(data): Observable<any> {
    return this.http.post(`${BASEURL}/Usermanagement/EditUserData`, data);
  }

  getUpdateBetStatus(UserId, Status, isAll): Observable<any> {
    return this.http.post(
      `${BASEURL}/Usermanagement/UpdateBetStatus?userid=${UserId}&status=${Status}&isall=${isAll}`,
      {}
    );
  }

  getResetPwd(data): Observable<any> {
    return this.http.post(`${BASEURL}/Usermanagement/ResetPwd`, data);
  }

  getAccountInfo(): Observable<any> {
    return this.http.get(`${BASEURL}/Usermanagement/AccountInfo`);
  }

  getBlockedClient(): Observable<any> {
    return this.http.get(`${BASEURL}/Usermanagement/GetBlockedUsers`);
  }

  getRulesReggulations(): Observable<any> {
    return this.http.get(`${BASEURL}/Settings/GetRulesNCondition`);
  }

  getSaveRulesNCodition(data: any): Observable<any> {
    return this.http.post(`${BASEURL}/Settings/SaveRulesNCondition`, data);
  }

  GetCommNLimits(): Observable<any> {
    return this.http.get(`${BASEURL}/Usermanagement/GetCommNLimits`);
  }

  UpdateFixLimits(USERID, LIMIT): Observable<any> {
    return this.http.post(
      `${BASEURL}/Limits/UpdateFixLimits?userid=${USERID}&limit=${LIMIT}`,
      {}
    );
  }

  UpdateFixLimitsCl(USERID, LIMIT, CURLIMIT): Observable<any> {
    return this.http.post(
      `${BASEURL}/Limits/UpdateFixLimitsCl?userid=${USERID}&limit=${LIMIT}&curlimit=${CURLIMIT}`,
      {}
    );
  }

}
