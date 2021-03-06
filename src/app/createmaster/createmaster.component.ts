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
    if(this.userId){
      this.isdisabled=true;
    }
    this.masterform=this.formbuilder.group({
      username:[''],
      firstName:['',Validators.required],
      fixLimit:[{value: '', disabled: this.isdisabled},Validators.required],
      Mastershare:[{value: '', disabled: true},Validators.required],
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
      this.masterform.controls['bookdisplaytype'].setValue(this.accountInfo.bookDisplayType.toString());
    })
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        if(data.userType!=1){
            this.iscommissionedit=true;
        }else{
            this.iscommissionedit=false;
        }
        // console.log(data)
        // console.log(this.iscommissionedit);
        
        if(this.userId){
          this.getuserdata();
        }else{
          this.usertype=4;
          this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
            this.masterform.controls['username'].setValue(resp.userName);
          })
        }
        this.formControlfixlimitChanged()
        this.formControlsmysharechanged();
        // this.formControlsmaxsharechanged()
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
                "fixLimit":this.masterform.get("fixLimit").value,
                "fixFees":this.edituserdata.fixedfees,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.edituserdata.myShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":1,
                "mLossingComm":this.masterform.get("MloseComm").value,
                "sLossingComm":this.masterform.get("SloseComm").value,
                "userID":this.userId
              }
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  setTimeout(() => {
                    this.router.navigateByUrl('/master');
                  }, 2000);
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.masterform.value;
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
              "SComm":this.masterform.get("SComm").value,
              "agentShare":this.masterform.get("Mastershare").value,
              "context":"web",
              "firstName":this.userdata.firstName,
              "fixLimit":this.userdata.fixLimit,
              "fixFees":fixedfeess,
              "isMComm":0,
              "isSComm":0,
              "myShare":this.userdata.myShare,
              "bookDisplayType":bookdisplay,
              "commType":1,
              "mLossingComm":this.masterform.get("MloseComm").value,
              "sLossingComm":this.masterform.get("SloseComm").value,
              "password":this.userdata.password,
              "userType":4
            }
            // console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                setTimeout(() => {
                  this.router.navigateByUrl('/master');
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
