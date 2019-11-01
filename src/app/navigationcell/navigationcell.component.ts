import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationcell',
  templateUrl: './navigationcell.component.html',
  styleUrls: ['./navigationcell.component.css']
})
export class NavigationcellComponent implements OnInit {
  data:any;
  currentroute: string;

  constructor(private router: Router) {
    this.currentroute=this.router.url
   }

  agInit(params:any){
    this.data=params.data
  }

  ngOnInit() {
  }

}
