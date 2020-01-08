import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-clientreport',
  templateUrl: './clientreport.component.html',
  styleUrls: ['./clientreport.component.css']
})
export class ClientreportComponent implements OnInit {
  title: string;
  matchId: string;

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.getreports.GetClientMatchReport(this.matchId,'').subscribe(resp=>{
      console.log(resp);
    })
  }

}
