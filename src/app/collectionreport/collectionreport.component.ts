import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-collectionreport',
  templateUrl: './collectionreport.component.html',
  styleUrls: ['./collectionreport.component.css']
})
export class CollectionreportComponent implements OnInit {
  matchId: string;
  denaHai=[];
  lenaHai=[];
  clearHai: any;

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.getreports.GetCollectionReport().subscribe(resp=>{
      console.log(resp);
      this.denaHai=resp.denaHai;
      this.lenaHai=resp.lenaHai;
      this.clearHai=resp.clearHai;
    })
  }

}
