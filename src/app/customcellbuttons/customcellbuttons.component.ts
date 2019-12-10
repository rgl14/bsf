import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FancyService } from '../services/fancy.service';
import { NotificationService } from '../shared/notification.service';
import { BookmakingService } from '../services/bookmaking.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { SportDataService } from '../services/sport-data.service';

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
    private notifyService: NotificationService,
    private dialog: MatDialog,
    private sportService: SportDataService
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


  openDialog(): void {
    const dialogRef = this.dialog.open(SetMatchLiveTvDialog, {
      width: '500px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if (result) {
        this.SaveLiveTvbyMatch(result);
      }
    });
  }
  SaveLiveTvbyMatch(result) {
    const bfmtid = result.matchBfId;
    const no = result.id;
    const ip = result.ip;
    const p = "p1";

    if (result.hdmi) {
      result.hdmi = result.hdmi.toUpperCase()
    }
    const hdmi = result.hdmi;

    this.sportService.SaveLiveTvbyMatch(bfmtid, no, ip, p, hdmi).subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.params.context.componentParent.GetImportRateList();
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }


}


@Component({
  selector: 'set-match-live-tv-dialog',
  templateUrl: 'set-match-live-tv-dialog.html',
})
export class SetMatchLiveTvDialog {

  constructor(
    public dialogRef: MatDialogRef<SetMatchLiveTvDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
