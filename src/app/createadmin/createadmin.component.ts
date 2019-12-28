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

    
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        console.log(data)
        this.accountInfo=data;
        if(this.userId){
          this.getuserdata();
          this.isdisabled=true;
          this.Companyform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            CompanyShare:['',Validators.required],
            myShare:['',Validators.required],
            MComm:['',Validators.required],
            SComm:['',Validators.required],
            MloseComm:['',Validators.required],
            SloseComm:['',Validators.required],
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
          this.Companyform=this.formbuilder.group({
            username:[''],
            firstName:['',Validators.required],
            fixLimit:['',Validators.required],
            CompanyShare:['',Validators.required],
            myShare:['',Validators.required],
            MComm:['',Validators.required],
            SComm:['',Validators.required],
            MloseComm:['',Validators.required],
            SloseComm:['',Validators.required],
            fixedfees:['',Validators.required],
            bookdisplaytype:['1'],
            password:[{value: '', disabled: this.isdisabled},[Validators.required, Validators.minLength(6)]],
            confirmPassword:[{value: '', disabled: this.isdisabled},Validators.required],
            // isMComm: false,
            // isSComm: false,
          }, {
            validator: MustMatch('password', 'confirmPassword')
          })
        }
      }
    })

    

    this.formControlsmysharechanged()
    this.formControlsmaxsharechanged()
    this.formControlfixlimitChanged()
    this.formControlmcommchanged()
    this.formControlscommchanged()
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
                "agentShare":this.edituserdata.agentShare,
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
              "MComm":this.userdata.MComm,
              "SComm":this.userdata.SComm,
              "agentShare":this.userdata.agentShare,
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
      (mode: number) => {
          
          if(mode > this.accountInfo.minCompanyShare){
            this.Companyform.controls['myShare'].setValue(this.accountInfo.minCompanyShare);
          }else{
            let myshare = this.accountInfo.minCompanyShare-mode;
            this.accountInfo.CompanyShare=myshare;
          }
    });
  }
  formControlsmaxsharechanged(){
    this.Companyform.get('CompanyShare').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.CompanyShare){
            this.Companyform.controls['CompanyShare'].setValue(this.accountInfo.CompanyShare)
          }else{
            let maxshare = this.accountInfo.minCompanyShare-mode;

          }
    });
  }
  formControlfixlimitChanged() {
    this.Companyform.get('fixLimit').valueChanges.subscribe(
        (mode: number) => {
          this.totalremaininglimit=mode;
            if(mode > this.accountInfo.remainingLimit){
              this.Companyform.controls['fixLimit'].setValue(this.accountInfo.remainingLimit)
            }
    });
  }
  formControlmcommchanged(){
    this.Companyform.get('MComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.matchComm){
            this.Companyform.controls['MComm'].setValue(this.accountInfo.matchComm)
          }
    });
  }
  formControlscommchanged(){
    this.Companyform.get('SComm').valueChanges.subscribe(
      (mode: number) => {
          if(mode > this.accountInfo.sessionComm){
            this.Companyform.controls['SComm'].setValue(this.accountInfo.sessionComm)
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

