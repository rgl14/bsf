import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addfancy',
  templateUrl: './addfancy.component.html',
  styleUrls: ['./addfancy.component.css']
})
export class AddfancyComponent implements OnInit {
  addfancyform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) { }

  ngOnInit() {
    this.addfancyform=this.formbuilder.group({
      username:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.addfancyform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addfancyform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addfancyform.invalid) {
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
