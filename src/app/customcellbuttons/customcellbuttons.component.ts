import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FancyService } from '../services/fancy.service';
import { NotificationService } from '../shared/notification.service';
import { BookmakingService } from '../services/bookmaking.service';

@Component({
  selector: 'app-customcellbuttons',
  templateUrl: './customcellbuttons.component.html',
  styleUrls: ['./customcellbuttons.component.css']
})
export class CustomcellbuttonsComponent implements OnInit {
  data: any;
  currentroute: string;
  params: any;
  disabled: boolean = false;

  constructor(
    private router: Router,
    private fancyService: FancyService,
    private bmService: BookmakingService,
    private notifyService: NotificationService
  ) {
    this.currentroute = this.router.url
  }

  agInit(params) {
    this.params = params;
    this.data = this.params.data;
  }
  ngOnInit() {

  }
  getvalue(data: any) {
    console.log(data)
  }

  CancelFancybyId() {

    this.disabled = true;

    this.fancyService.CancelFancybyId(this.data.fancyCode, this.data.matchId).subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetFancyList();
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;
    }, err => {

    })
  }

  CloseBookBulk() {
    this.disabled = true;

    this.bmService.CloseBookBulk(this.data.bookCode).subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetBookList();
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }
}
