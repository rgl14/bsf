import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { LoginService } from '../services/login.service';
import { NotificationService } from '../shared/notification.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private _bottomSheet: MatBottomSheet,
    private loginService: LoginService,
    private tokenService: TokenService,
    private notifyService: NotificationService
  ) { }

  ngOnInit() {
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }


  Logout() {
    this.loginService.Logout().subscribe(data => {
      if (data.status == "Success") {
        this.notifyService.success(data.result);
        this.tokenService.removeToken();
      }
      else {
        this.notifyService.error(data.result);
      }
    }, err => {
      if (err.status === 405) {
        this.tokenService.removeToken();
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