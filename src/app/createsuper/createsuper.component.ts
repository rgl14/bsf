import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-createsuper',
  templateUrl: './createsuper.component.html',
  styleUrls: ['./createsuper.component.css']
})
export class CreatesuperComponent implements OnInit {
  supermasterform:FormGroup;
  submitted=false;
  isdisabled: boolean=false;
  accountInfo: any;
  userId: any;
  maxsupershare: number;
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

    this.usermanagement.getAccountInfo().subscribe(data=>{
      console.log(data)
    })
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        if(data.userType!=1){
            this.iscommissionedit=true;
        }else{
            this.iscommissionedit=false;
        }
        console.log(data)
        this.accountInfo=data;
        if(this.userId){
          this.getuserdata();
          this.isdisabled=true;
          this.supermasterform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            Supershare:[{value: '', disabled: true},Validators.required],
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
          this.usertype=3;
          this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
            this.supermasterform.controls['username'].setValue(resp.userName);
            // this.supermasterform.setValue({  
            //   username:resp.userName,
            //   firstName:'',
            //   fixLimit:'',
            //   Supershare:'',
            //   myShare:'',
            //   MComm:0,
            //   SComm:0,
            //   MloseComm:'',
            //   SloseComm:'',
            //   fixedfees:'',
            //   bookdisplaytype:'1',
            //   password:'',
            //   confirmPassword:'',
            //   // isMComm: mcomm,
            //   // isSComm: scomm,
            // });  
          })
          this.supermasterform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            Supershare:[{value: '', disabled: true},Validators.required],
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
          
          // this.supermasterform.controls['MComm'].setValue(data.matchComm);
          // this.supermasterform.controls['SComm'].setValue(data.sessionComm);
          // this.supermasterform.controls['MloseComm'].setValue(data.mLossingComm);
          // this.supermasterform.controls['SloseComm'].setValue(data.sLossingComm);
        }
        this.formControlsmysharechanged()
        // this.formControlsmaxsharechanged()
        this.formControlfixlimitChanged()
        // this.formControlmcommchanged()
        this.formControlscommchanged()
        this.formControlmLossingCommchanged();
        this.formControlsLossingCommCommchanged();
      }
    })
    
  }
  onClear() {
    // this.submitted = false;
    this.supermasterform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.supermasterform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.supermasterform.invalid) {
            return;
        }else{
          // console.log(this.supermasterform)
          if(this.userId){
              this.edituserdata=this.supermasterform.value;
              // console.log(this.edituserdata)
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
                "MComm":this.supermasterform.get("MComm").value,
                "SComm":this.supermasterform.get("SComm").value,
                "agentShare":this.supermasterform.get("Supershare").value,
                "context":"web",
                "firstName":this.edituserdata.firstName,
                "fixLimit":this.edituserdata.fixLimit,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.edituserdata.myShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":this.edituserdata.fixedfees,
                "mLossingComm":this.supermasterform.get("MloseComm").value,
                "sLossingComm":this.supermasterform.get("SloseComm").value,
                "userID":this.userId
              }
              // console.log(editusersdata,"EDITuserdata")
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  this.router.navigateByUrl("/supermaster");
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.supermasterform.value;
            // console.log(this.userdata)
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
              "SComm":this.supermasterform.get("SComm").value,
              "agentShare":this.supermasterform.get("Supershare").value,
              "context":"web",
              "firstName":this.userdata.firstName,
              "fixLimit":this.userdata.fixLimit,
              "isMComm":0,
              "isSComm":0,
              "myShare":this.userdata.myShare,
              "password":this.userdata.password,
              "bookDisplayType":this.userdata.bookdisplaytype,
              "commType":this.userdata.fixedfees,
              "mLossingComm":this.supermasterform.get("MloseComm").value,
              "sLossingComm":this.supermasterform.get("SloseComm").value,
              "userType":3
            }
            // console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                this.router.navigateByUrl("/supermaster");
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
    this.supermasterform.get('myShare').valueChanges.subscribe(
      (mode: number) => {
          
          if(mode > this.accountInfo.maxMyShare){
            this.supermasterform.controls['myShare'].setValue(this.accountInfo.maxMyShare);
          }else{
            let myshare = this.accountInfo.maxMyShare-mode;
            this.supermasterform.controls['Supershare'].setValue(myshare);
          }
    });
  }
  // formControlsmaxsharechanged(){
  //   this.supermasterform.get('Supershare').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.CompanyShare){
  //           this.supermasterform.controls['Supershare'].setValue(this.accountInfo.CompanyShare)
  //         }else{
  //           let maxshare = this.accountInfo.minCompanyShare-mode;

  //         }
  //   });
  // }
  formControlfixlimitChanged() {
    this.supermasterform.get('fixLimit').valueChanges.subscribe(
        (mode: number) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.supermasterform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  // formControlmcommchanged(){
  //   this.supermasterform.get('MComm').valueChanges.subscribe(
  //     (mode: number) => {
  //       if(this.iscommissionedit){
  //         if(mode > this.accountInfo.matchComm){
  //           this.supermasterform.controls['MComm'].setValue(this.accountInfo.matchComm)
  //         }
  //       }else{
  //         if(mode > 100){
  //           this.supermasterform.controls['MComm'].setValue(100)
  //         }
  //       }
  //   });
  // }
  formControlscommchanged(){
    this.supermasterform.get('SComm').valueChanges.subscribe(
      (mode: number) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.sessionComm){
            this.supermasterform.controls['SComm'].setValue(this.accountInfo.sessionComm)
          }
        }else{
          if(mode > 100){
            this.supermasterform.controls['SComm'].setValue(100)
          }
        }
    });
  }
  formControlmLossingCommchanged(){
    this.supermasterform.get('MloseComm').valueChanges.subscribe(
      (mode: number) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.mLossingComm){
            this.supermasterform.controls['MloseComm'].setValue(this.accountInfo.mLossingComm)
          }
        }else{
          if(mode > 100){
            this.supermasterform.controls['MloseComm'].setValue(100)
          }
        }
    });
  }
  formControlsLossingCommCommchanged(){
    this.supermasterform.get('SloseComm').valueChanges.subscribe(
      (mode: number) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.sLossingComm){
            this.supermasterform.controls['SloseComm'].setValue(this.accountInfo.sLossingComm)
          }
        }else{
          if(mode > 100){
            this.supermasterform.controls['SloseComm'].setValue(100)
          }
        }
    });
  }

  getuserdata(){
    this.usermanagement.getUserInfo(this.userId).subscribe(resp=>{
      // console.log(resp.data)
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
      this.supermasterform.setValue({  
        username:resp.data.userName,
        firstName:resp.data.name,
        fixLimit:resp.data.fixLimit,
        Supershare:this.maxsupershare,
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
