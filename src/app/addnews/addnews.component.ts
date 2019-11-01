import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit {

  addnewsform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) { }

  ngOnInit() {
    this.addnewsform=this.formbuilder.group({
      ticker:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.addnewsform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addnewsform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addnewsform.invalid) {
          this.notification.error('Not Submitted');
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
