import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ManageformService } from '../manageform.service';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-createsuperagent',
  templateUrl: './createsuperagent.component.html',
  styleUrls: ['./createsuperagent.component.css']
})
export class CreatesuperagentComponent implements OnInit {
  
  superagentform:FormGroup;
  submitted=false;
  isdisabled: boolean=false;
  accountInfo: any;
  userId: any;
  maxsuperagentshare: number;
  totalremaininglimit: number=0;
  edituserdata: any;
  ismatchcomm: any;
  issessioncomm: any;
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
    this.superagentform=this.formbuilder.group({
      username:[''],
      firstName:['',Validators.required],
      fixLimit:[{value: '', disabled: this.isdisabled},Validators.required],
      Superagentshare:[{value: '', disabled: true},Validators.required],
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
      this.superagentform.controls['bookdisplaytype'].setValue(this.accountInfo.bookDisplayType.toString());
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
        this.accountInfo=data;
        if(this.userId){
          this.getuserdata();
        }else{
          this.usertype=5;
          this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
            this.superagentform.controls['username'].setValue(resp.userName);
          })
        }
        this.formControlfixlimitChanged()
        this.formControlsmysharechanged()
        // this.formControlsmaxsharechanged()
        this.formControlmcommchanged()
        this.formControlscommchanged()
        this.formControlmLossingCommchanged();
        this.formControlsLossingCommCommchanged();
      }
    })

  }
  onClear() {
    // this.submitted = false;
    this.superagentform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.superagentform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.superagentform.invalid) {
            return;
        }else{
          // console.log(this.superagentform)
          if(this.userId){
              this.edituserdata=this.superagentform.value;
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
                "MComm":this.superagentform.get("MComm").value,
                "SComm":this.superagentform.get("SComm").value,
                "agentShare":this.superagentform.get("Superagentshare").value,
                "context":"web",
                "firstName":this.edituserdata.firstName,
                "fixLimit":this.superagentform.get("fixLimit").value,
                "fixFees":this.edituserdata.fixedfees,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.edituserdata.myShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":1,
                "mLossingComm":this.superagentform.get("MloseComm").value,
                "sLossingComm":this.superagentform.get("SloseComm").value,
                "userID":this.userId
              }
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  setTimeout(() => {
                    this.router.navigateByUrl('/superagent');
                  }, 2000);
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.superagentform.value;
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
              "SComm":this.superagentform.get("SComm").value,
              "agentShare":this.superagentform.get("Superagentshare").value,
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
              "mLossingComm":this.superagentform.get("MloseComm").value,
              "sLossingComm":this.superagentform.get("SloseComm").value,
              "userType":5
            }
            // console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                setTimeout(() => {
                  this.router.navigateByUrl('/superagent');
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
    this.superagentform.get('myShare').valueChanges.subscribe(
      (mode: number) => {
          
          if(mode > this.accountInfo.maxMyShare){
            this.superagentform.controls['myShare'].setValue(this.accountInfo.maxMyShare);
          }else{
            let myshare = this.accountInfo.maxMyShare-mode;
            this.superagentform.controls['Superagentshare'].setValue(myshare);
          }
    });
  }
  // formControlsmaxsharechanged(){
  //   this.superagentform.get('Superagentshare').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.CompanyShare){
  //           this.superagentform.controls['Superagentshare'].setValue(this.accountInfo.CompanyShare)
  //         }else{
  //           let maxshare = this.accountInfo.minCompanyShare-mode;

  //         }
  //   });
  // }
  formControlfixlimitChanged() {
    this.superagentform.get('fixLimit').valueChanges.subscribe(
        (mode: number) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.superagentform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  formControlmcommchanged(){
    this.superagentform.get('MComm').valueChanges.subscribe(
      (mode: number) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.matchComm){
            this.superagentform.controls['MComm'].setValue(this.accountInfo.matchComm)
          }
        }else{
          if(mode > 100){
            this.superagentform.controls['MComm'].setValue(100)
          }
        }
    });
  }
  formControlscommchanged(){
    this.superagentform.get('SComm').valueChanges.subscribe(
      (mode: number) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.sessionComm){
            this.superagentform.controls['SComm'].setValue(this.accountInfo.sessionComm)
          }
        }else{
          if(mode > 100){
            this.superagentform.controls['SComm'].setValue(100)
          }
        }
    });
  }
  formControlmLossingCommchanged(){
    this.superagentform.get('MloseComm').valueChanges.subscribe(
      (mode: number) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.mLossingComm){
            this.superagentform.controls['MloseComm'].setValue(this.accountInfo.mLossingComm)
          }
        }else{
          if(mode > 100){
            this.superagentform.controls['MloseComm'].setValue(100)
          }
        }
    });
  }
  formControlsLossingCommCommchanged(){
    this.superagentform.get('SloseComm').valueChanges.subscribe(
      (mode: number) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.sLossingComm){
            this.superagentform.controls['SloseComm'].setValue(this.accountInfo.sLossingComm)
          }
        }else{
          if(mode > 100){
            this.superagentform.controls['SloseComm'].setValue(100)
          }
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
      this.maxsuperagentshare=this.accountInfo.minCompanyShare-resp.data.myShare;
      this.superagentform.setValue({  
        username:resp.data.userName,
        firstName:resp.data.name,
        fixLimit:resp.data.fixLimit,
        Superagentshare:this.maxsuperagentshare,
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
