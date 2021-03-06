import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASEURL = "http://gamex247.net/Admin/Admin.svc";

@Injectable({
  providedIn: 'root'
})
export class BookmakingService {

  constructor(private http: HttpClient) { }


  AddBook(data): Observable<any> {
    return this.http.post(`${BASEURL}/BookMaking/AddBook`, data);
  }
  BookTypes(): Observable<any> {
    return this.http.get(`${BASEURL}/BookMaking/BookTypes`);
  }
  CloseBookBulk(IDS): Observable<any> {
    return this.http.post(`${BASEURL}/BookMaking/CloseBookBulk?ids=${IDS}`, {});
  }
  EditBetStatus(ID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/BookMaking/EditBetStatus?id=${ID}&status=${STATUS}`, {});
  }
  EditBookSettings(data): Observable<any> {
    return this.http.post(`${BASEURL}/BookMaking/EditBookSettings`, data);
  }
  EditStatus(ID, STATUS): Observable<any> {
    return this.http.post(`${BASEURL}/BookMaking/EditStatus?id=${ID}&status=${STATUS}`, {});
  }
  GetBookInfo(ID): Observable<any> {
    return this.http.get(`${BASEURL}/BookMaking/GetBookInfo?id=${ID}`);
  }
  GetBookList(STATUS, ISETTLED): Observable<any> {
    return this.http.get(`${BASEURL}/BookMaking/GetBookList?status=${STATUS}&isettled=${ISETTLED}`);
  }
  UpdateBook(data): Observable<any> {
    return this.http.post(`${BASEURL}/BookMaking/UpdateBook`, data);
  }
  SettleBook(bookdata): Observable<any> {
    return this.http.post(`${BASEURL}/BookMaking/SettleBook?bookid=${bookdata.BOOKID}&mtid=${bookdata.MTID}&winner=${bookdata.WINNER}&type=${bookdata.TYPE}`,{});
  }

}
