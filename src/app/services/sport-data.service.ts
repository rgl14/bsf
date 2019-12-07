import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASEURL = "http://173.249.43.228/BSF777Adm/Admin.svc";

@Injectable({
  providedIn: 'root'
})
export class SportDataService {

  constructor(private http: HttpClient) { }

  GetSportList(): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetSportList`);
  }
  GetTournamentList(SID, ISALL): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetTournamentList?sid=${SID}&isall=${ISALL}`);
  }
  GetMatchList(SID, TOURID, ISALL, STATUS): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetMatchList?sid=${SID}&tourid=${TOURID}&isall=${ISALL}&status=${STATUS}`);
  }
  GetMktList(SID, TOURID, MTID, ISALL, STATUS): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetMktList?sid=${SID}&tourid=${TOURID}&mtid=${MTID}&isall=${ISALL}&status=${STATUS}`);
  }
}
