import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ratesnavigation',
  templateUrl: './ratesnavigation.component.html',
  styleUrls: ['./ratesnavigation.component.css']
})
export class RatesnavigationComponent implements OnInit {
  data: any;
  currentroute: any;

  constructor(private router: Router) {
    this.currentroute=this.router.url
  }
   
  agInit(params){
    this.data=params.data;
  }
  ngOnInit() {
  }
  getvalue(data:any){
    console.log(data)
  }

}
