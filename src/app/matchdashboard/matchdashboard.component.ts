import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matchdashboard',
  templateUrl: './matchdashboard.component.html',
  styleUrls: ['./matchdashboard.component.css']
})
export class MatchdashboardComponent implements OnInit {
  matchId: string;
  matchMarkets=[];
  sessionMarkets=[];
  title: string;
  sprtID: string;
  mtbfID: string;
  MktId: string;
  bookMarkets=[];

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.sprtID=this.route.snapshot.paramMap.get('sportBfId');
    this.mtbfID=this.route.snapshot.paramMap.get('bfId');
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.title=this.route.snapshot.paramMap.get('title');
    this.MktId=this.route.snapshot.paramMap.get('id');

    this.getreports.GetMatchDashboard(this.matchId).subscribe(resp=>{
      // console.log(resp);
      if(resp.matchMarkets!=null){
        this.matchMarkets=resp.matchMarkets;
      }
      if(resp.sessionMarkets!=null){
        this.sessionMarkets=resp.sessionMarkets;
      }
      if(resp.bookMarkets!=null){
        this.bookMarkets=resp.bookMarkets;
      }
    })
  }

}
