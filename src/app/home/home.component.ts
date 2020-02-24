import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../services/usermanagement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userinfo: any;

  constructor(private usermanagement:UsermanagementService,) { }

  ngOnInit() {
    this.usermanagement.getAccountInfo().subscribe(data=>{
      this.userinfo=data.data;
    })
  }

}
