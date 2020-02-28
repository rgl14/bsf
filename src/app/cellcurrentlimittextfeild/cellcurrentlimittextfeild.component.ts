import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cellcurrentlimittextfeild',
  templateUrl: './cellcurrentlimittextfeild.component.html',
  styleUrls: ['./cellcurrentlimittextfeild.component.css']
})
export class CellcurrentlimittextfeildComponent implements OnInit {
  data: any;
  Currentlimit: any;

  constructor() { }

  ngOnInit() {
  }
  agInit(params:any){
    // console.log(params.data.currentLimit);
    if(params.data.currentLimit){
      this.Currentlimit=parseFloat(params.data.currentLimit).toFixed(0);
    }
    // this.data=params.data;
  }

}
