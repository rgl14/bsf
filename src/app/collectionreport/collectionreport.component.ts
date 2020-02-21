import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import _ from 'lodash';
import { LimitsService } from '../services/limits.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-collectionreport',
  templateUrl: './collectionreport.component.html',
  styleUrls: ['./collectionreport.component.css']
})
export class CollectionreportComponent implements OnInit {
  matchId: string;
  denaHai=[];
  lenaHai=[];
  clearHai=[];
  totallena: any;
  totaldena: any;
  totalclear: any;

  constructor(
    private route:ActivatedRoute,
    private router: Router,
    private getreports:ReportsService,
    private limits:LimitsService,
    public notification:NotificationService
    ) { }

  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.Collectionreport();
  }

  Collectionreport(){
    this.getreports.GetCollectionReport().subscribe(resp=>{
      // console.log(resp);
      this.denaHai=resp.denaHai;
      this.lenaHai=resp.lenaHai;
      this.clearHai=resp.clearHai;
      this.totallena =0.00;
      this.totaldena =0.00;
      this.totalclear =0.00;
      _.forEach(this.lenaHai, (itemdena, index) => {
        this.totallena=this.totallena+parseFloat(itemdena.amount);
      })
      _.forEach(this.denaHai, (itemlena, index) => {
        this.totaldena=this.totaldena+parseFloat(itemlena.amount);
      })
      _.forEach(this.clearHai, (itemclear, index) => {
        this.totalclear=this.totalclear+parseFloat(itemclear.amount);
      })
    })
  }

  clearcash(userid,amount,type){
    let data={
      USERID:userid,
      AMOUNT:amount
    }
    console.log(data,type)
    // if(type==1){
    //   this.clearRecevcash(data);
    // }else{
    //   this.clearpaycash(data);
    // }
  }

  clearRecevcash(data){
    this.limits.ReceiveCash(data).subscribe(resp=>{
      if (resp.status == "Success") {
        this.notification.success(resp.result);
        this.Collectionreport();
        setTimeout(() => {
          this.router.navigateByUrl('/collectionreport');
        }, 2000);
      }else{
        this.notification.error(resp.result);
      }
    })
  }
  clearpaycash(data){
    this.limits.PayCash(data).subscribe(resp=>{
      if (resp.status == "Success") {
        this.notification.success(resp.result);
        this.Collectionreport();
        setTimeout(() => {
          this.router.navigateByUrl('/collectionreport');
        }, 2000);
      }else{
        this.notification.error(resp.result);
      }
    })
  }

}
