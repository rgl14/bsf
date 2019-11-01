import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.css']
})
export class AddroleComponent implements OnInit {

  addroleform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) { }

  ngOnInit() {
    this.addroleform=this.formbuilder.group({
      rolename:['',Validators.required],
      roledesc:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.addroleform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addroleform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addroleform.invalid) {
          this.notification.error('Not Submitted');
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
