import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { LoginService } from '../services/login.service';
import { NotificationService } from '../shared/notification.service';
import { TokenService } from '../services/token.service';
import { UsermanagementService } from '../services/usermanagement.service';
import { SharedataService } from '../services/sharedata.service';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  userType: any;
  tickerList: any;
  betingstatus: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loginService: LoginService,
    private tokenService: TokenService,
    private notifyService: NotificationService,
    private sharedata :SharedataService,
    private usermanagement:UsermanagementService,
    private analysisservice:AnalysisSignalrService,
    private ticker:TickerService,
  ) { }

  ngOnInit() {
    this.usermanagement.getAccountInfo().subscribe(resp=>{
      // console.log(resp.data);
      this.sharedata.shareAccountInfo(resp.data);
      let address="http://173.249.43.228:11334";
      this.analysisservice.connectAnalysis(address,resp.data.userId)
    })
    this.ticker.GetTickerList().subscribe(resp=>{
      // console.log(resp)
      this.tickerList=resp.tickerList;
    })
    this.usermanagement.GetBettingStatus().subscribe(resp=>{
      console.log(resp)
      this.betingstatus=resp.status;
    })

    this.userType=this.tokenService.getUserType();
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }


  Logout() {
    this.loginService.Logout().subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.tokenService.removeToken();
        this.tokenService.removeUserType();
        window.location.reload();
      }
      else {
        this.notifyService.error(data.result);
      }
    })
  }

  upadateBettingstatus(status){
    this.usermanagement.UpdateBettingStatus(status).subscribe(data=>{
      if (data.status == "Success") {
        this.notifyService.success(data.result);
      }else{
        this.notifyService.error(data.result);
      }
    })
  }

}


@Component({
  selector: 'bottom-sheet',
  templateUrl: '../bottom-sheet/bottom-sheet.html',
})
export class BottomSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}