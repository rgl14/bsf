import { Component, OnInit } from '@angular/core';
import { FancyService } from '../services/fancy.service';
import { NotificationService } from '../shared/notification.service';
import { BookmakingService } from '../services/bookmaking.service';

@Component({
  selector: 'app-buttontogglecell',
  templateUrl: './buttontogglecell.component.html',
  styleUrls: ['./buttontogglecell.component.css']
})
export class ButtontogglecellComponent implements OnInit {
  isActive: boolean;
  disabled: boolean;
  data: any;

  params: any;

  constructor(
    private fancyService: FancyService,
    private notifyService: NotificationService,
    private bmService: BookmakingService
  ) { }
  agInit(params) {
    // console.log(params);
    this.params = params;
    this.data = this.params.data;

    if (this.params.colDef.field == "isActive") {
      if (this.data.isActive == 1) {
        this.isActive = false;
      }
      else {
        this.isActive = true;
      }
    }
    if (this.params.colDef.field == "isBetAllow") {
      if (this.data.isBetAllow == 1) {
        this.isActive = false;
      }
      else {
        this.isActive = true;
      }
    }

  }

  ngOnInit() {

  }

  update() {

    if (this.data.fancyCode) {
      if (this.params.colDef.field == "isActive") {
        this.UpdateFancyStatus();
      }

      if (this.params.colDef.field == "isBetAllow") {
        this.UpdateFancyBetStatus();
      }
    }
    else if (this.data.bookCode) {
      if (this.params.colDef.field == "isActive") {
        this.EditBookStatus();
      }

      if (this.params.colDef.field == "isBetAllow") {
        this.EditBookBetStatus();
      }
    }


  }

  UpdateFancyStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isActive = 1;
    }
    else {
      this.data.isActive = 0;
    }
    this.fancyService.UpdateFancyStatus(this.data.fancyCode, this.data.isActive).subscribe(data => {

      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;

    }, err => {

    })
  }

  UpdateFancyBetStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isBetAllow = 1;
    }
    else {
      this.data.isBetAllow = 0;
    }
    this.fancyService.UpdateFancyBetStatus(this.data.fancyCode, this.data.isBetAllow).subscribe(data => {

      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;

    }, err => {

    })
  }

  EditBookStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isActive = 1;
    }
    else {
      this.data.isActive = 0;
    }

    this.bmService.EditStatus(this.data.bookCode, this.data.isActive).subscribe(data => {
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;
    })
  }

  EditBookBetStatus() {
    this.disabled = true;
    if (this.isActive) {
      this.data.isBetAllow = 1;
    }
    else {
      this.data.isBetAllow = 0;
    }
    this.bmService.EditBetStatus(this.data.bookCode, this.data.isBetAllow).subscribe(data => {
      if (data.status == "Success") {
        if (this.isActive) {
          this.isActive = false;
        }
        else {
          this.isActive = true;
        }
        this.notifyService.success(data.result);
      }
      else {
        this.notifyService.error(data.result);
      }

      this.disabled = false;
    })
  }

}
