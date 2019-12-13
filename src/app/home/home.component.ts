import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../services/usermanagement.service';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userinfo: any;

  constructor(private sharedata:SharedataService) { }

  ngOnInit() {
    this.sharedata.AccountInfoSource.subscribe(resp=>{
      this.userinfo=resp;
    })
  }

}
