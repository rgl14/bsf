import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import _ from 'lodash';

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

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
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

}
