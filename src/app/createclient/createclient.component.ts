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
  MaxmyShare: any;
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
    this.clientform=this.formbuilder.group({
      username:[''],
      firstName:['',Validators.required],
      fixLimit:[{value: '', disabled: this.isdisabled}],
      // myShare:['',Validators.required],
      MComm:[''],
      SComm:[''],
      MloseComm:[''],
      SloseComm:[''],
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
      this.MaxmyShare=this.accountInfo.maxMyShare;
      this.clientform.controls['bookdisplaytype'].setValue(this.accountInfo.bookDisplayType.toString());
    })
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        if(data.userType!=1){
            this.iscommissionedit=true;
        }else{
            this.iscommissionedit=false;
        }
        // console.log(data);
        
        // console.log(this.iscommissionedit);
        this.accountInfo=data;
        if(this.userId){
          this.getuserdata();
        }else{
          this.usertype=6;
          this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
            this.clientform.controls['username'].setValue(resp.userName);
          })
          this.clientform.controls['fixLimit'].setValue(0);
          this.clientform.controls['MComm'].setValue(0);
          this.clientform.controls['SComm'].setValue(0);
          this.clientform.controls['MloseComm'].setValue(0);
          this.clientform.controls['SloseComm'].setValue(0);
          this.clientform.controls['fixedfees'].setValue(0);
        }
        this.formControlfixlimitChanged();
        // this.formControlsmysharechanged();
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
                "MComm":this.clientform.get("MComm").value,
                "SComm":this.clientform.get("SComm").value,
                "agentShare":0,
                "context":"web",
                "firstName":this.edituserdata.firstName,
                "fixLimit":this.edituserdata.fixLimit,
                "fixFees":this.edituserdata.fixedfees,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.MaxmyShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":1,
                "mLossingComm":this.clientform.get("MloseComm").value,
                "sLossingComm":this.clientform.get("SloseComm").value,
                "userID":this.userId
              }
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  setTimeout(() => {
                    this.router.navigateByUrl('/clients');
                  }, 2000);
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.clientform.value;
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
              "SComm":this.clientform.get("SComm").value,
              "agentShare":0,
              "context":"web",
              "firstName":this.userdata.firstName,
              "fixLimit":this.userdata.fixLimit,
              "fixFees":fixedfeess,
              "isMComm":0,
              "isSComm":0,
              "myShare":this.MaxmyShare,
              "password":this.userdata.password,
              "bookDisplayType":bookdisplay,
              "commType":1,
              "mLossingComm":this.clientform.get("MloseComm").value,
              "sLossingComm":this.clientform.get("SloseComm").value,
              "userType":6
            }
            console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                setTimeout(() => {
                  this.router.navigateByUrl('/clients');
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

  // formControlsmysharechanged(){
  //   this.clientform.get('myShare').valueChanges.subscribe(
  //     (mode: number) => {
          
  //         if(mode > this.accountInfo.maxMyShare){
  //           this.clientform.controls['myShare'].setValue(this.accountInfo.maxMyShare);
  //         }
  //   });
  // }
  formControlfixlimitChanged() {
    this.clientform.get('fixLimit').valueChanges.subscribe(
        (mode: number) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.clientform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  formControlmcommchanged(){
    this.clientform.get('MComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.matchComm){
            this.clientform.controls['MComm'].setValue(this.accountInfo.matchComm)
          }
    });
  }
  formControlscommchanged(){
    this.clientform.get('SComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.sessionComm){
            this.clientform.controls['SComm'].setValue(this.accountInfo.sessionComm)
          }
    });
  }
  formControlmLossingCommchanged(){
    this.clientform.get('MloseComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.mLossingComm){
            this.clientform.controls['MloseComm'].setValue(this.accountInfo.mLossingComm)
          }
    });
  }
  formControlsLossingCommCommchanged(){
    this.clientform.get('SloseComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.sLossingComm){
            this.clientform.controls['SloseComm'].setValue(this.accountInfo.sLossingComm)
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
      this.maxsupershare=this.accountInfo.minCompanyShare-resp.data.myShare;
      this.MaxmyShare=resp.data.myShare
      this.clientform.setValue({  
        username:resp.data.userName,
        firstName:resp.data.name,
        fixLimit:resp.data.fixLimit,
        // myShare:resp.data.myShare,
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
