import { Component,OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NotificationService } from '../shared/notification.service';
import { UsermanagementService } from '../services/usermanagement.service';
import { Router } from '@angular/router';
import { FancyService } from '../services/fancy.service';

@Component({
  selector: 'app-settingfancybookcell',
  templateUrl: './settingfancybookcell.component.html',
  styleUrls: ['./settingfancybookcell.component.css']
})
export class SettingfancybookcellComponent implements OnInit {
  params: any;
  data: any;

  constructor(
    public dialog: MatDialog,
    private notifyService: NotificationService,
    private  usermanagement:UsermanagementService,
    private router: Router,
    private fancyservice:FancyService
    ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FancyBooksettingDialog, {
      width: '450px',
      data:this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      var data={
        "betDelay":2147483647,
        "fancyId":2147483647,
        "maxStake":2147483647,
        "maxStakePerRate":2147483647,
        "minStake":2147483647,
        "rateDiff":2147483647,
        "rateRange":2147483647
      }
      this.fancyservice.UpdFancySettings(data).subscribe(data=>{
        
      })
    });
  }
  agInit(params) {
    // console.log(params);
    this.params = params;
    this.data = this.params.data;
  }
}

@Component({
  selector: 'booksetting',
  templateUrl: '../Dialogbox/booksetting.html',
})
export class FancyBooksettingDialog {
  params: any;

  constructor(
    public dialogRef: MatDialogRef<FancyBooksettingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  agInit(params) {
    // console.log(params);
    this.params = params;
    this.data = this.params.data;
  }

}
