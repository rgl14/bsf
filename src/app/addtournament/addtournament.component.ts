import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-addtournament',
  templateUrl: './addtournament.component.html',
  styleUrls: ['./addtournament.component.css']
})
export class AddtournamentComponent implements OnInit {

  addtournamentform:FormGroup;
  submitted=false;
  constructor(private formbuilder:FormBuilder,private notification:NotificationService) { }

  ngOnInit() {
    this.addtournamentform=this.formbuilder.group({
      sportname:['',Validators.required],
      tourname:['',Validators.required],
      tourbfid:['',Validators.required],
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.addtournamentform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addtournamentform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addtournamentform.invalid) {
          this.notification.error('Not Submitted');
            return;
        }
      this.notification.success('Submitted successfully');
  }

}
