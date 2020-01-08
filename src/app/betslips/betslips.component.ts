import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-betslips',
  templateUrl: './betslips.component.html',
  styleUrls: ['./betslips.component.css']
})
export class BetslipsComponent implements OnInit {
  title: string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
  }

}
