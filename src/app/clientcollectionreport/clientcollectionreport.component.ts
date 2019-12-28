import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-clientcollectionreport',
  templateUrl: './clientcollectionreport.component.html',
  styleUrls: ['./clientcollectionreport.component.css']
})
export class ClientcollectionreportComponent implements OnInit {
  matchId: string;
  denaHai=[];
  lenaHai=[];

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.getreports.GetMatchCollectionReport(this.matchId).subscribe(resp=>{
      console.log(resp);
      this.denaHai=resp.denaHai;
      this.lenaHai=resp.lenaHai;
    })
  }

}
