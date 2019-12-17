import { Component, OnInit } from '@angular/core';
import { UsermanagementService } from '../services/usermanagement.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userType: string;
  constructor(private usermanagement:UsermanagementService) { }

  ngOnInit() {
    this.userType=this.usermanagement.getUserType();
  }
}
