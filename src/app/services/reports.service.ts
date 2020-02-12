import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BASEURL = "http://173.249.43.228/BSF777Adm/Admin.svc";
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  AnalysisReport(): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/AnalysisReport`);
  }

  GetAllMatchPnl(): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetAllMatchPnl`);
  }

  RejectBets(id,PWD): Observable<any> {
    return this.http.post(`${BASEURL}/Reports/RejectBets?id=${id}&pwd=${PWD}`, {});
  }

  RejectBetsMulti(id,MTID,PWD): Observable<any> {
    return this.http.post(`${BASEURL}/Reports/RejectBetsMulti?ids=${id}&mtid=${MTID}&pwd=${PWD}`, {});
  }

  GetBetSlip(MKTID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetBetSlip?mktid=${MKTID}`);
  }

  GetCashLedger(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetCashLedger?id=${ID}`);
  }

  GetClientLedgerBal(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetClientLedgerBal?id=${ID}`);
  }

  GetClientMatchReport(MTID,MKTID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetClientMatchReport?mtid=${MTID}&mktid=${MKTID}`);
  }

  GetCollectionReport(): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetCollectionReport`);
  }

  GetCompanyMatchReport(MTID,MKTID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetCompanyMatchReport?mtid=${MTID}&mktid=${MKTID}`);
  }

  GetLedger(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetLedger?id=${ID}`);
  }

  GetLogInOutReport(): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetLogInOutReport`);
  }

  GetMatchCollectionReport(MTID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetMatchCollectionReport?mtid=${MTID}`);
  }

  GetMatchDashboard(MTID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetMatchDashboard?mtid=${MTID}`);
  }

  GetProfitLoss(SIDS,dates): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetProfitLoss?sids=${SIDS}&from=${dates.fromdate}&to=${dates.todate}`);
  }

  GetSessionEarningReport(MTID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetSessionEarningReport?mtid=${MTID}`);
  }

  GetSportsPnl(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetSportsPnl?id=${ID}`);
  }

  GetTournamentPnl(ID,SID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetTournamentPnl?id=${ID}&sid=${SID}`);
  }

  GetOddsBetSlip(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetOddsBetSlip?mtid=${ID}`);
  }

  GetFancyBetSlip(ID): Observable<any> {
    return this.http.get(`${BASEURL}/Reports/GetFancyBetSlip?mtid=${ID}`);
  }

}
