import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-createmaster',
  templateUrl: './createmaster.component.html',
  styleUrls: ['./createmaster.component.css']
})
export class CreatemasterComponent implements OnInit {
  masterform:FormGroup;
  submitted=false;
  isdisabled: boolean=false;
  accountInfo: any;
  userId: any;
  maxmastershare: number;
  totalremaininglimit: number=0;
  edituserdata: any;
  ismatchcomm: number;
  issessioncomm: number;
  userdata: any;
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

    // this.usermanagement.getAccountInfo().subscribe(data=>{
    //   console.log(data)
    // })
    this.usermanagement.getAccountInfo().subscribe(data=>{
      if(data!=null){
        if(data.userType!=1){
            this.iscommissionedit=true;
        }else{
            this.iscommissionedit=false;
        }
        // console.log(data)
        // console.log(this.iscommissionedit);
        this.accountInfo=data;
        if(this.userId){
          this.getuserdata();
          this.isdisabled=true;
          this.masterform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            Mastershare:[{value: '', disabled: true},Validators.required],
            myShare:['',Validators.required],
            MComm:[''],
            SComm:['',Validators.required],
            MloseComm:['',Validators.required],
            SloseComm:['',Validators.required],
            fixedfees:[''],
            bookdisplaytype:['1'],
            password:[{value: '', disabled: this.isdisabled},[Validators.required, Validators.minLength(6)]],
            confirmPassword:[{value: '', disabled: this.isdisabled},Validators.required],
            // isMComm: false,
            // isSComm: false,
          }, {
            validator: MustMatch('password', 'confirmPassword')
          })
        }else{
          this.usertype=4;
          this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
            this.masterform.controls['username'].setValue(resp.userName);
          })
          this.masterform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            Mastershare:[{value: '', disabled: true},Validators.required],
            myShare:['',Validators.required],
            MComm:[''],
            SComm:['',Validators.required],
            MloseComm:['',Validators.required],
            SloseComm:['',Validators.required],
            fixedfees:[''],
            bookdisplaytype:['1'],
            password:[{value: '', disabled: this.isdisabled},[Validators.required, Validators.minLength(6)]],
            confirmPassword:[{value: '', disabled: this.isdisabled},Validators.required],
            // isMComm: false,
            // isSComm: false,
          }, {
            validator: MustMatch('password', 'confirmPassword')
          })
          // this.masterform.controls['MComm'].setValue(data.matchComm);
          // this.masterform.controls['SComm'].setValue(data.sessionComm);
          // this.masterform.controls['MloseComm'].setValue(data.mLossingComm);
          // this.masterform.controls['SloseComm'].setValue(data.sLossingComm);
        }
        this.formControlsmysharechanged();
        // this.formControlsmaxsharechanged()
        this.formControlfixlimitChanged();
        // this.formControlmcommchanged();
        this.formControlscommchanged();
        this.formControlmLossingCommchanged();
        this.formControlsLossingCommCommchanged();
      }
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
        }else{
          // console.log(this.masterform)
          if(this.userId){
              this.edituserdata=this.masterform.value;
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
                "MComm":this.masterform.get("MComm").value,
                "SComm":this.masterform.get("SComm").value,
                "agentShare":this.masterform.get("Mastershare").value,
                "context":"web",
                "firstName":this.edituserdata.firstName,
                "fixLimit":this.edituserdata.fixLimit,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.edituserdata.myShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":this.edituserdata.fixedfees,
                "mLossingComm":this.masterform.get("MloseComm").value,
                "sLossingComm":this.masterform.get("SloseComm").value,
                "userID":this.userId
              }
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  this.router.navigateByUrl("/master");
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.masterform.value;
            if(this.userdata.MComm==""){
              var matchComm=this.accountInfo.matchComm;
            }else{
              var matchComm=this.userdata.MComm;
            }
            if(this.userdata.fixedfees==""){
              this.userdata.fixedfees=1;
            }
            if(this.userdata.bookdisplaytype==""){
              this.userdata.bookdisplaytype=this.accountInfo.bookDisplayType;
            }
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
              "MComm":matchComm,
              "SComm":this.masterform.get("SComm").value,
              "agentShare":this.masterform.get("Mastershare").value,
              "context":"web",
              "firstName":this.userdata.firstName,
              "fixLimit":this.userdata.fixLimit,
              "isMComm":0,
              "isSComm":0,
              "myShare":this.userdata.myShare,
              "bookDisplayType":this.userdata.bookdisplaytype,
              "commType":this.userdata.fixedfees,
              "mLossingComm":this.masterform.get("MloseComm").value,
              "sLossingComm":this.masterform.get("SloseComm").value,
              "password":this.userdata.password,
              "userType":4
            }
            // console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                this.router.navigateByUrl("/master");
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
    this.masterform.get('myShare').valueChanges.subscribe(
      (mode: number) => {
          
          if(mode > this.accountInfo.maxMyShare){
            this.masterform.controls['myShare'].setValue(this.accountInfo.maxMyShare);
          }else{
            let myshare = this.accountInfo.maxMyShare-mode;
            this.accountInfo.CompanyShare=myshare;
            this.masterform.controls['Mastershare'].setValue(myshare);
          }
    });
  }
  // formControlsmaxsharechanged(){
  //   this.masterform.get('Mastershare').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.CompanyShare){
  //           this.masterform.controls['Mastershare'].setValue(this.accountInfo.CompanyShare)
  //         }else{
  //           let maxshare = this.accountInfo.minCompanyShare-mode;

  //         }
  //   });
  // }
  formControlfixlimitChanged() {
    this.masterform.get('fixLimit').valueChanges.subscribe(
        (mode: number) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.masterform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  // formControlmcommchanged(){
  //   this.masterform.get('MComm').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.matchComm){
  //           this.masterform.controls['MComm'].setValue(this.accountInfo.matchComm)
  //         }
  //   });
  // }
  formControlscommchanged(){
    this.masterform.get('SComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.sessionComm){
            this.masterform.controls['SComm'].setValue(this.accountInfo.sessionComm)
          }
    });
  }
  formControlmLossingCommchanged(){
    this.masterform.get('MloseComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.mLossingComm){
            this.masterform.controls['MloseComm'].setValue(this.accountInfo.mLossingComm)
          }
    });
  }
  formControlsLossingCommCommchanged(){
    this.masterform.get('SloseComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.sLossingComm){
            this.masterform.controls['SloseComm'].setValue(this.accountInfo.sLossingComm)
          }
    });
  }

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
      this.maxmastershare=this.accountInfo.minCompanyShare-resp.data.myShare;
      this.masterform.setValue({  
        username:resp.data.userName,
        firstName:resp.data.name,
        fixLimit:resp.data.fixLimit,
        Mastershare:this.maxmastershare,
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
