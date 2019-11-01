import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttontogglecell',
  templateUrl: './buttontogglecell.component.html',
  styleUrls: ['./buttontogglecell.component.css']
})
export class ButtontogglecellComponent implements OnInit {
  data:any
  constructor() { }
  agInit(params){
    this.data=params.data;
  }
  ngOnInit() {
  }

}
