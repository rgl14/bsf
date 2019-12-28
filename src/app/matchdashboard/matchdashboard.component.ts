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
  matchMarkets: any;
  sessionMarkets: any;

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.getreports.GetMatchDashboard(this.matchId).subscribe(resp=>{
      console.log(resp);
      this.matchMarkets=resp.matchMarkets;
      this.sessionMarkets=resp.sessionMarkets;
    })
  }

}
