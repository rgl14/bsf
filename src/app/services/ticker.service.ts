import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BASEURL = "http://gamex247.net/Admin/Admin.svc";

@Injectable({
  providedIn: 'root'
})

export class TickerService {

  constructor(private http: HttpClient) { }

  AddTicker(data): Observable<any> {
    return this.http.post(`${BASEURL}/NewsTicker/AddTicker`, data);
  }
  DeleteTicker(id): Observable<any> {
    return this.http.post(`${BASEURL}/NewsTicker/DeleteTicker?ids=${id}`, {});
  }
  UpdateTicker(data): Observable<any> {
    return this.http.post(`${BASEURL}/NewsTicker/UpdateTicker`, data);
  }
  UpdTickerStatus(id,status): Observable<any> {
    return this.http.post(`${BASEURL}/NewsTicker/UpdTickerStatus?id=${id}&status=${status}`, {});
  }
  GetTickerList(): Observable<any> {
    return this.http.get(`${BASEURL}/NewsTicker/GetTickerList`);
  }
}
