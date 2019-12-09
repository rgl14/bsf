import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addmarket',
  templateUrl: './addmarket.component.html',
  styleUrls: ['./addmarket.component.css']
})
export class AddmarketComponent implements OnInit {

  addmarketform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) { }

  ngOnInit() {
    this.addmarketform=this.formbuilder.group({
      MKTsportname:['',Validators.required],
      MKTtourname:['',Validators.required],
      MKTmatchname:['',Validators.required],
      MKTname:['',Validators.required],
      marketstatus:['',Validators.required],
      MKTbfid:['',Validators.required],
      MKTrate:['',Validators.required],
      MKTrunner1:['',Validators.required],
      MKTrunner2:['',Validators.required],
      MKTrunner3:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.addmarketform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addmarketform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addmarketform.invalid) {
          this.notification.error('Not Submitted');
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
