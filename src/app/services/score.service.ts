import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BASEURL = "http://www.gamex247.net/Admin/Admin.svc";
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  GetScoreInfo(MTID): Observable<any> {
    return this.http.get(`${BASEURL}/LiveScore/GetScoreInfo?mtid=${MTID}`);
  }

  GetScoreList(): Observable<any> {
    return this.http.get(`${BASEURL}/LiveScore/GetScoreList`);
  }

  AddScore(MTID): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/AddScore?mtid=${MTID}`, {});
  }

  UpdateMatchResult(MTID,RES): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateMatchResult?mtid=${MTID}&res=${RES}`, {});
  }

  UpdateScore(TID,RUNS): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateScore?tid=${TID}&runs=${RUNS}`, {});
  }

  UpdateScoreTeamStatus(TID,STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateScoreTeamStatus?tid=${TID}&status=${STATUS}`, {});
  }

  UpdateTossResult(MTID,RES): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateTossResult?mtid=${MTID}&res=${RES}`, {});
  }
}
