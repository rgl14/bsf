import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = "http://173.249.43.228/BSF777Adm/Admin.svc";

@Injectable({
  providedIn: 'root'
})
export class FancyService {

  constructor(private http: HttpClient) { }

  AddFancy(data): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/AddFancy`, data);
  }
  AllBallRunning(MTID): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/AllBallRunning?mtid=${MTID}`, {});
  }
  CancelFancybyId(ID, MTID): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/CancelFancybyId?id=${ID}&mtid=${MTID}`, {});
  }
  GetFancyInfobyId(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Fancy/GetFancyInfobyId?id=${ID}`);
  }
  GetFancyList(SPORTID, TOURID, MATCHID, STATUS, ISETTLED): Observable<any> {
    return this.http.get(`${BASEURL}/Fancy/GetFancyList?sportid=${SPORTID}&tourid=${TOURID}&matchid=${MATCHID}&status=${STATUS}&isettled=${ISETTLED}`);
  }
  GetFancyTypes(): Observable<any> {
    return this.http.get(`${BASEURL}/Fancy/GetFancyTypes`);
  }
  SetFancyCloseBulk(IDS): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/SetFancyCloseBulk?ids=${IDS}`, {});
  }
  UpdateFancy(data): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/UpdateFancy`, data);
  }
  UpdateFancyBetStatus(ID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/UpdateFancyBetStatus?id=${ID}&status=${STATUS}`, {});
  }
  UpdateFancyStatus(ID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/UpdateFancyStatus?id=${ID}&status=${STATUS}`, {});
  }
  UpdFancySettings(data): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/UpdFancySettings`, data);
  }
  SettleFancy(data): Observable<any> {
    return this.http.post(`${BASEURL}/Fancy/SettleFancy?mid=${data.MID}&fid=${data.FID}&s=${data.S}`,{});
  }
}
