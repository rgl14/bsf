import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ManageformService } from '../manageform.service';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css']
})
export class CreateadminComponent implements OnInit {
  Companyform:FormGroup;
  submitted=false;
  // constructor(private service: ManageformService,public notification:NotificationService) { }
  constructor(private formbuilder : FormBuilder,public notification:NotificationService) { }
  // hide = true;
  // confirmhide = true;
  ngOnInit() {
    this.Companyform=this.formbuilder.group({
      username:['SS7326',Validators.required],
      fullname:['',Validators.required],
      limit:['',Validators.required],
      share:['',Validators.required],
      myshare:['',Validators.required],
      matchcomm:['',Validators.required],
      sesscomm:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword:['',Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }
  onClear() {
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    // this.notification.success('Submitted successfully');
    this.notification.error('Not Submitted');
    this.submitted = false;
    this.Companyform.reset();
    // this.notification.notificationsnackbar('Submitted successfully');
    // this.notification.warning('Submitted successfully');
  }

  // convenience getter for easy access to form fields
  get f() { return this.Companyform.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.Companyform.invalid) {
            this.notification.error('Not Submitted');
            return;
        }
    // if (this.service.form.valid) {
    //   this.service.form.reset();
    //   this.service.initializeFormGroup();
      this.notification.success('Submitted successfully');
    // }
  }
}
