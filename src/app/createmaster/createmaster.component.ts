import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ManageformService } from '../manageform.service';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-createmaster',
  templateUrl: './createmaster.component.html',
  styleUrls: ['./createmaster.component.css']
})
export class CreatemasterComponent implements OnInit {
  masterform:FormGroup;
  submitted=false;
  constructor(private formbuilder : FormBuilder,public notification:NotificationService) { }

  ngOnInit() {
    this.masterform=this.formbuilder.group({
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
    this.submitted = false;
    this.masterform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.masterform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.masterform.invalid) {
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
