import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASEURL = "http://173.249.43.228/BSF777Adm/Admin.svc";

@Injectable({
  providedIn: 'root'
})
export class SportDataService {

  constructor(private http: HttpClient) { }

  AddMarket(data): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/AddMarket`, data)
  }

  AddMatch(data): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/AddMatch`, data)
  }

  AddSports(data): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/AddSports`, data)
  }
  AddTournament(data): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/AddSports`, data)
  }

  FetchRunnersData(BFID): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/FetchRunnersData?bfid=${BFID}`, {})
  }

  GetImportRateList(SID, TID, MTID, MKTID): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetImportRateList?sid=${SID}&tid=${TID}&mtid=${MTID}&mktid=${MKTID}`);
  }

  GetMarketCtlg(): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetMarketCtlg`);
  }

  GetMatchList(SID, TOURID, ISALL, STATUS): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetMatchList?sid=${SID}&tourid=${TOURID}&isall=${ISALL}&status=${STATUS}`);
  }

  GetMktList(SID, TOURID, MTID, ISALL, STATUS): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetMktList?sid=${SID}&tourid=${TOURID}&mtid=${MTID}&isall=${ISALL}&status=${STATUS}`);
  }

  GetSportList(): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetSportList`);
  }
  GetTournamentList(SID, ISALL): Observable<any> {
    return this.http.get(`${BASEURL}/SportsData/GetTournamentList?sid=${SID}&isall=${ISALL}`);
  }

  ImportMarket(data): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/ImportMarket`, data)
  }

  UpdateHawaStatus(MKTID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateHawaStatus?mktid=${MKTID}&status=${STATUS}`, {})
  }
  UpdateMatchStatus(MTID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateMatchStatus?mtid=${MTID}&status=${STATUS}`, {})
  }
  UpdateMatchStatusbulk(MTIDS, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateMatchStatusbulk?mtids=${MTIDS}&status=${STATUS}`, {})
  }

  UpdateMktBetStatus(MKTID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateMktBetStatus?mktid=${MKTID}&status=${STATUS}`, {})
  }

  UpdateMktBetStatusbulk(MKTIDS, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateMktBetStatusbulk?mktids=${MKTIDS}&status=${STATUS}`, {})
  }
  UpdateMktStatus(MKTID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateMktStatus?mktid=${MKTID}&status=${STATUS}`, {})
  }

  UpdateMktStatusbulk(MKTIDS, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateMktStatusbulk?mktids=${MKTIDS}&status=${STATUS}`, {})
  }

  UpdateSportsStatus(BFID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateSportsStatus?bfid=${BFID}&status=${STATUS}`, {})
  }

  UpdateSportsStatusbulk(BFIDS, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateSportsStatusbulk?bfids=${BFIDS}&status=${STATUS}`, {})
  }

  UpdateTournamentStatus(BFID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateTournamentStatus?bfid=${BFID}&status=${STATUS}`, {})
  }

  UpdateTournamentStatusbulk(BFIDS, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/SportsData/UpdateTournamentStatusbulk?bfids=${BFIDS}&status=${STATUS}`, {})
  }

  SaveMktSettingPackage(data): Observable<any> {
    return this.http.post(`${BASEURL}/Settings/SaveMktSettingPackage`, data)
  }

  GetMktSettingsPckgList(): Observable<any> {
    return this.http.get(`${BASEURL}/Settings/GetMktSettingsPckgList`);
  }
  GetMktSettingsPackage(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Settings/GetMktSettingsPackage?id=${ID}`);
  }

  SaveLiveTvbyMatch(BFMTID, NO, IP, P, HDMI): Observable<any> {
    return this.http.post(`${BASEURL}/LiveTv/SaveLiveTvbyMatch?bfmtid=${BFMTID}&no=${NO}&ip=${IP}&p=${P}&hdmi=${HDMI}`, {})
  }
}
