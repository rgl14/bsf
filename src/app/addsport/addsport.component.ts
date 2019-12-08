import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addsport',
  templateUrl: './addsport.component.html',
  styleUrls: ['./addsport.component.css']
})
export class AddsportComponent implements OnInit {

  addSportform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) { }

  ngOnInit() {
    this.addSportform=this.formbuilder.group({
      sportname:['',Validators.required],
      sportbfid:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.addSportform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addSportform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addSportform.invalid) {
          this.notification.error('Not Submitted');
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
