import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  adduserform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) { }

  ngOnInit() {
    this.adduserform=this.formbuilder.group({
      admusername:['',Validators.required],
      admfullname:['',Validators.required],
      admpassword:['',Validators.required],
      admrolename:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.adduserform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.adduserform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.adduserform.invalid) {
          this.notification.error('Not Submitted');
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
