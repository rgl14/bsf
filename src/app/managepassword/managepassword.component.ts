import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';
import { NotificationService } from '../shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-managepassword',
  templateUrl: './managepassword.component.html',
  styleUrls: ['./managepassword.component.css']
})
export class ManagepasswordComponent implements OnInit {
  changepasswordform:FormGroup;
  submitted:boolean=false;
  userId: string;
  accountInfo: any;
  constructor
  (
    private usermanagement:UsermanagementService,
    private formbuilder : FormBuilder,
    public notification:NotificationService,
    private route:ActivatedRoute,
    private sharedata: SharedataService,
    private router: Router) { }

  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.changepasswordform=this.formbuilder.group({
      // oldpassword:['',Validators.required],
      newpassword:['',Validators.required],
      confirmpassword:['',Validators.required],
    }, {
      validator: MustMatch('newpassword', 'confirmpassword')
    })

    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        this.accountInfo=data;
      }
    })

  }

  get f() { return this.changepasswordform.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changepasswordform.invalid) {  
      this.notification.error('Please Enter values');
      return;
    }else{
      var changepassworddata=this.changepasswordform.value;
      console.log(changepassworddata)
      var data={
        "changebyPwd":this.accountInfo.userName,
        "context":"web",
        "newPwd":changepassworddata.newpassword,
        "userId":this.userId
      }
      console.log(data)
      this.usermanagement.getResetPwd(data).subscribe(resp=>{
        if(resp.status=='Success'){
          this.notification.success(resp.result);
          this.changepasswordform.reset();
        }else{
          this.notification.error(resp.result);
        }
      })
  }    
  }

}
