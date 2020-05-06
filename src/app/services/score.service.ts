import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BASEURL = "http://gamex247.net/Admin/Admin.svc";
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

  UpdateComments(data): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateComments`, data);
  }

  UpdateScore(TID,RUNS,BALL,WKT): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateScore?tid=${TID}&runs=${RUNS}&ball=${BALL}&wkt=${WKT}`, {});
  }

  UpdateScore2(TID,SCORE,OVER,BALL,WKT): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateScore2?tid=${TID}&score=${SCORE}&over=${OVER}&ball=${BALL}&wkt=${WKT}`, {});
  }

  UpdateScoreTeamStatus(TID,STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateScoreTeamStatus?tid=${TID}&status=${STATUS}`, {});
  }

  UpdateTossResult(MTID,RES): Observable<any> {
    return this.http.post(`${BASEURL}/LiveScore/UpdateTossResult?mtid=${MTID}&res=${RES}`, {});
  }
}
