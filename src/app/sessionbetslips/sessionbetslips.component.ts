import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sessionbetslips',
  templateUrl: './sessionbetslips.component.html',
  styleUrls: ['./sessionbetslips.component.css']
})
export class SessionbetslipsComponent implements OnInit {
  title: string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
  }

}
