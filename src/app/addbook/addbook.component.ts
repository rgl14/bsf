import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  addbookform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) {
    
  }

  ngOnInit() {
    this.addbookform=this.formbuilder.group({
      bookname:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.addbookform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addbookform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addbookform.invalid) {
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
