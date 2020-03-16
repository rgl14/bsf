import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-createagent',
  templateUrl: './createagent.component.html',
  styleUrls: ['./createagent.component.css']
})
export class CreateagentComponent implements OnInit {
  agentform:FormGroup;
  submitted=false;
  isdisabled: boolean=false;
  userId: string;
  accountInfo: any;
  maxagentshare: number;
  totalremaininglimit: number=0;
  edituserdata: any;
  ismatchcomm: number;
  issessioncomm: number;
  userdata: any;
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
    if(this.userId){
      this.isdisabled=true;
    }
    this.agentform=this.formbuilder.group({
      username:[''],
      firstName:['',Validators.required],
      fixLimit:['',Validators.required],
      Agentshare:[{value: '', disabled: true},Validators.required],
      myShare:['',Validators.required],
      MComm:[''],
      SComm:['',Validators.required],
      MloseComm:['',Validators.required],
      SloseComm:['',Validators.required],
      fixedfees:[''],
      bookdisplaytype:[''],
      password:[{value: '', disabled: this.isdisabled},[Validators.required, Validators.minLength(6)]],
      confirmPassword:[{value: '', disabled: this.isdisabled},Validators.required],
      // isMComm: false,
      // isSComm: false,
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
    this.accountInfo='';
    this.usermanagement.getAccountInfo().subscribe(data=>{
      this.accountInfo=data.data;
      this.agentform.controls['bookdisplaytype'].setValue(this.accountInfo.bookDisplayType.toString());
    })
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        if(data.userType!=1){
          this.iscommissionedit=true;
        }else{
            this.iscommissionedit=false;
        }
        // console.log(data)
        this.accountInfo=data;
        if(this.userId){
          this.getuserdata();
        }else{
          
        }
        this.formControlfixlimitChanged()
        this.formControlsmysharechanged();
        // this.formControlsmaxsharechanged();
        this.formControlmcommchanged();
        this.formControlscommchanged();
        this.formControlmLossingCommchanged();
        this.formControlsLossingCommCommchanged();
      }
    })
    
  }
  onClear() {
    this.submitted = false;
    this.agentform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.agentform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.agentform.invalid) {
            return;
        }else{
          // console.log(this.supermasterform)
          if(this.userId){
              this.edituserdata=this.agentform.value;
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
                "MComm":this.agentform.get("MComm").value,
                "SComm":this.agentform.get("SComm").value,
                "agentShare":this.agentform.get("Agentshare").value,
                "context":"web",
                "firstName":this.edituserdata.firstName,
                "fixLimit":this.agentform.get("fixLimit").value,
                "fixFees":this.edituserdata.fixedfees,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.edituserdata.myShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":1,
                "mLossingComm":this.agentform.get("MloseComm").value,
                "sLossingComm":this.agentform.get("SloseComm").value,
                "userID":this.userId
              }
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  setTimeout(() => {
                    this.router.navigateByUrl('/agent');
                  }, 2000);
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.agentform.value;
            if(this.userdata.MComm==="" && this.iscommissionedit===true){
              var matchComm:any=this.accountInfo.matchComm;
            }
            else if((this.userdata.MComm==="" || this.userdata.MComm===null) && this.iscommissionedit===false){
              var matchComm:any=0;
            }
            else{
              var matchComm:any=this.userdata.MComm;
            }
            if(this.userdata.fixedfees==="" && this.iscommissionedit===true){
              var fixedfeess:any=this.accountInfo.fixFees;
            }
            else if((this.userdata.fixedfees==="" || this.userdata.fixedfees===null) && this.iscommissionedit===false){
              var fixedfeess:any=0;
            }
            else{
              var fixedfeess:any=this.userdata.fixedfees;
            }
            if(this.userdata.bookdisplaytype==""){
              var bookdisplay=this.accountInfo.bookDisplayType;
            }else{
              var bookdisplay=this.userdata.bookdisplaytype;
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
              "SComm":this.agentform.get("SComm").value,
              "agentShare":this.agentform.get("Agentshare").value,
              "context":"web",
              "firstName":this.userdata.firstName,
              "fixLimit":this.userdata.fixLimit,
              "fixFees":fixedfeess,
              "isMComm":0,
              "isSComm":0,
              "myShare":this.userdata.myShare,
              "password":this.userdata.password,
              "bookDisplayType":bookdisplay,
              "commType":1,
              "mLossingComm":this.agentform.get("MloseComm").value,
              "sLossingComm":this.agentform.get("SloseComm").value,
              "userType":6
            }
            // console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                setTimeout(() => {
                  this.router.navigateByUrl('/agent');
                }, 2000);
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
    this.agentform.get('myShare').valueChanges.subscribe(
      (mode: number) => {
          
          if(mode > this.accountInfo.maxMyShare){
            this.agentform.controls['myShare'].setValue(this.accountInfo.maxMyShare);
          }else{
            let myshare = this.accountInfo.maxMyShare-mode;
            this.agentform.controls['Agentshare'].setValue(myshare);
          }
    });
  }
  // formControlsmaxsharechanged(){
  //   this.agentform.get('Agentshare').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.CompanyShare){
  //           this.agentform.controls['Agentshare'].setValue(this.accountInfo.CompanyShare)
  //         }else{
  //           let maxshare = this.accountInfo.minCompanyShare-mode;

  //         }
  //   });
  // }
  formControlfixlimitChanged() {
    this.agentform.get('fixLimit').valueChanges.subscribe(
        (mode: number) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.agentform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  formControlmcommchanged(){
    this.agentform.get('MComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.matchComm){
            this.agentform.controls['MComm'].setValue(this.accountInfo.matchComm)
          }
    });
  }
  formControlscommchanged(){
    this.agentform.get('SComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.sessionComm){
            this.agentform.controls['SComm'].setValue(this.accountInfo.sessionComm)
          }
    });
  }
  formControlmLossingCommchanged(){
    this.agentform.get('MloseComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.mLossingComm){
            this.agentform.controls['MloseComm'].setValue(this.accountInfo.mLossingComm)
          }
    });
  }
  formControlsLossingCommCommchanged(){
    this.agentform.get('SloseComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.sLossingComm){
            this.agentform.controls['SloseComm'].setValue(this.accountInfo.sLossingComm)
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
      this.maxagentshare=this.accountInfo.minCompanyShare-resp.data.myShare;
      this.agentform.setValue({  
        username:resp.data.userName,
        firstName:resp.data.name,
        fixLimit:resp.data.fixLimit,
        Agentshare:this.maxagentshare,
        myShare:resp.data.myShare,
        MComm:resp.data.mComm,
        SComm:resp.data.sComm,
        MloseComm:resp.data.mLossingComm,
        SloseComm:resp.data.sLossingComm,
        fixedfees:resp.data.fixFees,
        bookdisplaytype:resp.data.bookDisplayType.toString(),
        password:'123456',
        confirmPassword:'123456',
        // isMComm: mcomm,
        // isSComm: scomm,
      });  
    })
  }
}
