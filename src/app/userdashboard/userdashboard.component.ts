import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

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

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }
  
  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.userName=this.route.snapshot.paramMap.get('userName');
    this.name=this.route.snapshot.paramMap.get('name');

    this.getclientLedgerBal();
  }

  getclientLedgerBal(){
    this.getreports.GetClientLedgerBal(this.userId).subscribe(resp=>{
      console.log(resp.ledgerBal)
      this.ledgerbal=resp.ledgerBal;
    })
  }

}
