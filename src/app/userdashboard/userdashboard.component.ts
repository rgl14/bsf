import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  userId: any;
  userName: any;
  name: any;
  ledgerbal: any;
  userType: any;
  LoggeduserType: any;

  constructor(
    private route:ActivatedRoute,
    private getreports:ReportsService,
    private sharedata: SharedataService
    ) { }
  
  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.userName=this.route.snapshot.paramMap.get('userName');
    this.name=this.route.snapshot.paramMap.get('name');
    this.userType=this.route.snapshot.paramMap.get('userType');

    this.getclientLedgerBal();
    this.LoggedUserInfo();
  }

  getclientLedgerBal(){
    this.getreports.GetClientLedgerBal(this.userId).subscribe(resp=>{
      console.log(resp.ledgerBal)
      this.ledgerbal=resp.ledgerBal;
    })
  }

  LoggedUserInfo(){
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        console.log(data)
        this.LoggeduserType=data.userType;
      }
    })
  }

}
