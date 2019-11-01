import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ManageformService } from '../manageform.service';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-createsuper',
  templateUrl: './createsuper.component.html',
  styleUrls: ['./createsuper.component.css']
})
export class CreatesuperComponent implements OnInit {
  supermasterform:FormGroup;
  submitted=false;
  constructor(private formbuilder : FormBuilder,public notification:NotificationService) { }

  ngOnInit() {
    this.supermasterform=this.formbuilder.group({
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
    this.supermasterform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.supermasterform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.supermasterform.invalid) {
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
