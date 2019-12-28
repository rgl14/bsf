import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-companyreport',
  templateUrl: './companyreport.component.html',
  styleUrls: ['./companyreport.component.css']
})
export class CompanyreportComponent implements OnInit {
  matchId: string;

  constructor(private route:ActivatedRoute,private getreports:ReportsService) { }
  
  ngOnInit() {
    this.matchId=this.route.snapshot.paramMap.get('matchId');
    this.getreports.GetCompanyMatchReport(this.matchId,'').subscribe(resp=>{
      console.log(resp);
    })
  }

}
