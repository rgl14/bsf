import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ManageformService } from '../manageform.service';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-createadmin',
  templateUrl: './createadmin.component.html',
  styleUrls: ['./createadmin.component.css']
})
export class CreateadminComponent implements OnInit {
  Companyform:FormGroup;
  submitted=false;
  userdata: any;
  edituserdata:any;
  ismatchcomm: number;
  issessioncomm: number;
  userId: string;
  isdisabled: boolean=false;
  accountInfo: any;
  totalremaininglimit: number=0;
  maxcompanyshare: number;
  usertype: number;
  iscommissionedit: boolean;
  // constructor(private service: ManageformService,public notification:NotificationService) { }
  constructor(
    private usermanagement:UsermanagementService,
    private formbuilder : FormBuilder,
    public notification:NotificationService,
    private route:ActivatedRoute,
    private router: Router,
    private sharedata: SharedataService
    ) { }
  // hide = true;
  // confirmhide = true;
  ngOnInit() {
    this.userId=this.route.snapshot.paramMap.get('userId');
    this.accountInfo='';
    this.usermanagement.getAccountInfo().subscribe(data=>{
      this.accountInfo=data.data;
      this.Companyform.controls['bookdisplaytype'].setValue(this.accountInfo.bookDisplayType.toString());
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
          this.isdisabled=true;
          this.Companyform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:[{value: '', disabled: this.isdisabled},Validators.required],
            CompanyShare:[{value: '', disabled: true},Validators.required],
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
        }else{
          this.usertype=2;
          this.usermanagement.GetNextUsername(this.usertype).subscribe(resp=>{
            this.Companyform.controls['username'].setValue(resp.userName);
          })
          this.Companyform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            CompanyShare:[{value: '', disabled: true},Validators.required],
            myShare:['',Validators.required],
            MComm:[''],
            SComm:['',Validators.required],
            MloseComm:['',Validators.required],
            SloseComm:['',Validators.required],
            fixedfees:['',Validators.required],
            bookdisplaytype:[''],
            password:[{value: '', disabled: this.isdisabled},[Validators.required, Validators.minLength(6)]],
            confirmPassword:[{value: '', disabled: this.isdisabled},Validators.required],
            // isMComm: false,
            // isSComm: false,
          }, {
            validator: MustMatch('password', 'confirmPassword')
          })
          // this.Companyform.controls['MComm'].setValue(data.matchComm);
          // this.Companyform.controls['SComm'].setValue(data.sessionComm);
          // this.Companyform.controls['MloseComm'].setValue(data.mLossingComm);
          // this.Companyform.controls['SloseComm'].setValue(data.sLossingComm);
          this.formControlsmysharechanged()

        }
        // this.formControlsmaxsharechanged()
        this.formControlfixlimitChanged()
        this.formControlmcommchanged();
        this.formControlscommchanged();
        this.formControlmLossingCommchanged();
        this.formControlsLossingCommCommchanged();
      }
    })

  }

  onClear() {
    // this.service.form.reset();
    // this.service.initializeFormGroup();
    // this.submitted = false;
    this.Companyform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.Companyform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.Companyform.invalid) {
            return;
        }else{
          // console.log(this.Companyform)
          if(this.userId){
              this.edituserdata=this.Companyform.value;
              console.log(this.Companyform.value)
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
                "MComm":this.Companyform.get("MComm").value,
                "SComm":this.Companyform.get("SComm").value,
                "agentShare":this.Companyform.get("CompanyShare").value,
                "context":"web",
                "firstName":this.edituserdata.firstName,
                "fixLimit":this.Companyform.get("fixLimit").value,
                "isMComm":0,
                "isSComm":0,
                "myShare":this.edituserdata.myShare,
                "bookDisplayType":this.edituserdata.bookdisplaytype,
                "commType":this.edituserdata.fixedfees,
                "mLossingComm":this.Companyform.get("MloseComm").value,
                "sLossingComm":this.Companyform.get("SloseComm").value,
                "userID":this.userId
              }
              this.usermanagement.getEditUserData(editusersdata).subscribe(resp=>{
                if (resp.status == "Success") {
                  this.notification.success(resp.result);
                  this.router.navigateByUrl("/admin");
                }else{
                  this.notification.error(resp.result);
                }
              })
          }else{
            this.userdata=this.Companyform.value;
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
              "MComm":this.Companyform.get("MComm").value,
              "SComm":this.Companyform.get("SComm").value,
              "agentShare":this.Companyform.get("CompanyShare").value,
              "context":"web",
              "firstName":this.userdata.firstName,
              "fixLimit":this.userdata.fixLimit,
              "isMComm":0,
              "isSComm":0,
              "myShare":this.userdata.myShare,
              "password":this.userdata.password,
              "bookDisplayType":this.userdata.bookdisplaytype,
              "commType":this.userdata.fixedfees,
              "mLossingComm":this.Companyform.get("MloseComm").value,
              "sLossingComm":this.Companyform.get("SloseComm").value,
              "userType":2
            }
            // console.log(data,"userdata")
            this.usermanagement.getCreatUser(data).subscribe(resp=>{
              if (resp.status == "Success") {
                this.notification.success(resp.result);
                this.router.navigateByUrl("/admin");
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
    this.Companyform.get('myShare').valueChanges.subscribe(
      (mode: any) => {
          
          if(mode > this.accountInfo.maxMyShare){
            this.Companyform.controls['myShare'].setValue(this.accountInfo.maxMyShare);
          }else{
            let myshare = this.accountInfo.maxMyShare-mode;
            this.Companyform.controls['CompanyShare'].setValue(myshare)
          }
    });
  }
  // formControlsmaxsharechanged(){
  //   this.Companyform.get('CompanyShare').valueChanges.subscribe(
  //     (mode: number) => {
  //         if(mode > this.accountInfo.CompanyShare){
  //           this.Companyform.controls['CompanyShare'].setValue(this.accountInfo.CompanyShare)
  //         }else{
  //           let maxshare = this.accountInfo.minCompanyShare-mode;

  //         }
  //   });
  // }
  formControlfixlimitChanged() {
    this.Companyform.get('fixLimit').valueChanges.subscribe(
        (mode: any) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.Companyform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  formControlmcommchanged(){
    this.Companyform.get('MComm').valueChanges.subscribe(
      (mode: any) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.matchComm){
            this.Companyform.controls['MComm'].setValue(this.accountInfo.matchComm)
          }
        }else{
          if(mode > 100){
            this.Companyform.controls['MComm'].setValue(100)
          }
        }
    });
  }
  formControlscommchanged(){
    this.Companyform.get('SComm').valueChanges.subscribe(
      (mode: any) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.sessionComm){
            this.Companyform.controls['SComm'].setValue(this.accountInfo.sessionComm)
          }
        }else{
          if(mode > 100){
            this.Companyform.controls['SComm'].setValue(100)
          }
        }
    });
  }
  formControlmLossingCommchanged(){
    this.Companyform.get('MloseComm').valueChanges.subscribe(
      (mode: any) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.mLossingComm){
            this.Companyform.controls['MloseComm'].setValue(this.accountInfo.mLossingComm)
          }
        }else{
          if(mode > 100){
            this.Companyform.controls['MloseComm'].setValue(100)
          }
        }
    });
  }
  formControlsLossingCommCommchanged(){
    this.Companyform.get('SloseComm').valueChanges.subscribe(
      (mode: any) => {
        if(this.iscommissionedit){
          if(mode > this.accountInfo.sLossingComm){
            this.Companyform.controls['SloseComm'].setValue(this.accountInfo.sLossingComm)
          }
        }else{
          if(mode > 100){
            this.Companyform.controls['SloseComm'].setValue(100)
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
      this.maxcompanyshare=this.accountInfo.minCompanyShare-resp.data.myShare;
      this.Companyform.setValue({  
        username:resp.data.userName,
        firstName:resp.data.name,
        fixLimit:resp.data.fixLimit,
        CompanyShare:this.maxcompanyshare,
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

