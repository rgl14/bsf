import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
const BASEURL = "http://gamex247.net/Admin/Admin.svc";
@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  constructor(private http : HttpClient) { }

  PayCash(data): Observable<any> {
    return this.http.post(`${BASEURL}/Limits/PayCash?userid=${data.USERID}&amount=${data.AMOUNT}`, {});
  }

  ReceiveCash(data): Observable<any> {
    return this.http.post(`${BASEURL}/Limits/ReceiveCash?userid=${data.USERID}&amount=${data.AMOUNT}`, {});
  }

  UpdateFixLimits(USERID,LIMIT): Observable<any> {
    return this.http.post(`${BASEURL}/Limits/UpdateFixLimits?userid=${USERID}&limit=${LIMIT}`, {});
  }

  UpdateFixLimitsCl(USERID,LIMIT,CURLIMIT): Observable<any> {
    return this.http.post(`${BASEURL}/Limits/UpdateFixLimitsCl?userid=${USERID}&limit=${LIMIT}&curlimit=${CURLIMIT}`, {});
  }

  GetCoinHistory(USERID): Observable<any> {
    return this.http.get(`${BASEURL}/Limits/GetCoinHistory?userid=${USERID}`);
  }

}
