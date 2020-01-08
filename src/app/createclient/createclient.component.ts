import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ManageformService } from '../manageform.service';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-createclient',
  templateUrl: './createclient.component.html',
  styleUrls: ['./createclient.component.css']
})
export class CreateclientComponent implements OnInit {
  clientform:FormGroup;
  submitted=false;
  isdisabled: boolean=false;
  accountInfo: any;
  userId: any;
  maxsupershare: any;
  totalremaininglimit: number=0;
  edituserdata: any;
  userdata: any;
  ismatchcomm: any;
  issessioncomm: any;
  usertype: number;
  iscommissionedit: boolean;
  constructor(
    private usermanagement:UsermanagementService,
    private formbuilder : FormBuilder,
    public notification:NotificationService,
    private route:ActivatedRoute,
    private router: Router,
    private sharedata: SharedataService
    ) { }

  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');

    
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        if(data.userType!=1){
            this.iscommissionedit=true;
        }else{
            this.iscommissionedit=false;
        }
        console.log(data)
        console.log(this.iscommissionedit);
        this.accountInfo=data;
        if(this.userId){
          this.getuserdata();
          this.isdisabled=true;
          this.clientform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            Clientshare:['',Validators.required],
            myShare:['',Validators.required],
            MComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            SComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            MloseComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            SloseComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            fixedfees:['',Validators.required],
            bookdisplaytype:['1'],
            password:[{value: '', disabled: this.isdisabled},[Validators.required, Validators.minLength(6)]],
            confirmPassword:[{value: '', disabled: this.isdisabled},Validators.required],
            // isMComm: false,
            // isSComm: false,
          }, {
            validator: MustMatch('password', 'confirmPassword')
          })
        }else{
          this.usertype=6;
          this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
            this.clientform.controls['username'].setValue(resp.userName);
          })
          this.clientform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            Clientshare:['',Validators.required],
            myShare:['',Validators.required],
            MComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            SComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            MloseComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            SloseComm:[{value: '', disabled: this.iscommissionedit},Validators.required],
            fixedfees:['',Validators.required],
            bookdisplaytype:['1'],
            password:[{value: '', disabled: this.isdisabled},[Validators.required, Validators.minLength(6)]],
            confirmPassword:[{value: '', disabled: this.isdisabled},Validators.required],
            // isMComm: false,
            // isSComm: false,
          }, {
            validator: MustMatch('password', 'confirmPassword')
          })
          this.clientform.controls['MComm'].setValue(data.matchComm);
          this.clientform.controls['SComm'].setValue(data.sessionComm);
          this.clientform.controls['MloseComm'].setValue(data.mLossingComm);
          this.clientform.controls['SloseComm'].setValue(data.sLossingComm);
        }
      }
    })
    

    this.formControlsmysharechanged()
    this.formControlsmaxsharechanged()
    this.formControlfixlimitChanged()
    // this.formControlmcommchanged()
    // this.formControlscommchanged()
  }
  onClear() {
    this.submitted = false;
    this.clientform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.clientform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.clientform.invalid) {
            return;
        }else{
          // console.log(this.clientform)
          if(this.userId){
              this.edituserdata=this.clientform.value;
              // if(this.edituserdata.isMComm){
              //   this.ismatchcomm=1;
              // }else{
              //   this.ismatchcomm=0;
              // }
              // if(this.edituserdata.isSComm){
              //   this.issessioncomm=1;
              // }else{
              //   this.issessioncomm=0;
              // }
              var editusersdata={
                "MComm":this.edituserdata.MComm,
                "SComm":this.edituserdata.SComm,
                "agentShare":this.edituserdata.Clientshare,
                "context":"web",
                "firstName":this.edituserdata.firstName,
                "fixLimit":this.edituserdata.fixLimit,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.edituserdata.myShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":this.edituserdata.fixedfees,
                "mLossingComm":this.edituserdata.MloseComm,
                "sLossingComm":this.edituserdata.SloseComm,
                "userID":this.userId
              }
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  this.router.navigateByUrl("/clients");
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.clientform.value;
            // if(this.userdata.isMComm){
            //   this.ismatchcomm=1;
            // }else{
            //   this.ismatchcomm=0;
            // }
            // if(this.userdata.isSComm){
            //   this.issessioncomm=1;
            // }else{
            //   this.issessioncomm=0;
            // }
            var data={
              "MComm":this.userdata.MComm,
              "SComm":this.userdata.SComm,
              "agentShare":this.userdata.Clientshare,
              "context":"web",
              "firstName":this.userdata.firstName,
              "fixLimit":this.userdata.fixLimit,
              "isMComm":0,
              "isSComm":0,
              "myShare":this.userdata.myShare,
              "password":this.userdata.password,
              "bookDisplayType":this.userdata.bookdisplaytype,
              "commType":this.userdata.fixedfees,
              "mLossingComm":this.userdata.MloseComm,
              "sLossingComm":this.userdata.SloseComm,
              "userType":6
            }
            // console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                this.router.navigateByUrl("/clients");
              }else{
                this.notification.error(resp.result);
              }
            })
          }
        }
    // if (this.service.form.valid) {
    //   this.service.form.reset();
    //   this.service.initializeFormGroup();
      
    // }
  }

  formControlsmysharechanged(){
    this.clientform.get('myShare').valueChanges.subscribe(
      (mode: number) => {
          
          if(mode > this.accountInfo.minCompanyShare){
            this.clientform.controls['myShare'].setValue(this.accountInfo.minCompanyShare);
          }else{
            let myshare = this.accountInfo.minCompanyShare-mode;
            this.accountInfo.CompanyShare=myshare;
          }
    });
  }
  formControlsmaxsharechanged(){
    this.clientform.get('Clientshare').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.CompanyShare){
            this.clientform.controls['Clientshare'].setValue(this.accountInfo.CompanyShare)
          }else{
            let maxshare = this.accountInfo.minCompanyShare-mode;

          }
    });
  }
  formControlfixlimitChanged() {
    this.clientform.get('fixLimit').valueChanges.subscribe(
        (mode: number) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.clientform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  // formControlmcommchanged(){
  //   this.clientform.get('MComm').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.matchComm){
  //           this.clientform.controls['MComm'].setValue(this.accountInfo.matchComm)
  //         }
  //   });
  // }
  // formControlscommchanged(){
  //   this.clientform.get('SComm').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.sessionComm){
  //           this.clientform.controls['SComm'].setValue(this.accountInfo.sessionComm)
  //         }
  //   });
  // }

  getuserdata(){
    this.usermanagement.getUserInfo(this.userId).subscribe(resp=>{
      console.log(resp.data)
      // if(resp.data.isMComm==1){
      //   var mcomm=true;
      // }else{
      //   var mcomm=false;
      // }
      // if(resp.data.isSComm==1){
      //   var scomm=true;
      // }else{
      //   var scomm=false;
      // }
      this.maxsupershare=this.accountInfo.minCompanyShare-resp.data.myShare;
      this.clientform.setValue({  
        username:resp.data.userName,
        firstName:resp.data.name,
        fixLimit:resp.data.fixLimit,
        Clientshare:this.maxsupershare,
        myShare:resp.data.myShare,
        MComm:resp.data.mComm,
        SComm:resp.data.sComm,
        MloseComm:resp.data.mLossingComm,
        SloseComm:resp.data.sLossingComm,
        fixedfees:10,
        bookdisplaytype:resp.data.bookDisplayType.toString(),
        password:'123456',
        confirmPassword:'123456',
        // isMComm: mcomm,
        // isSComm: scomm,
      });  
    })
  }

}
