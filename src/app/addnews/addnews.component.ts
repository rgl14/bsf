import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css']
})
export class AddnewsComponent implements OnInit {

  addnewsform:FormGroup;
  submitted=false;
  TickerId: any;
  formdata: any;
  tickerdata: any;
  constructor(
    private formbuilder:FormBuilder,
    private notification:NotificationService,
    private route:ActivatedRoute,
    private router: Router,
    private newsticker:TickerService
    ) { }

  ngOnInit() {
    this.TickerId=this.route.snapshot.paramMap.get('id');
    this.newsticker.GetTickerList().subscribe(resp=>{
      this.tickerdata=resp.tickerList;
    })
    this.addnewsform=this.formbuilder.group({
      ticker:['',Validators.required],
      displaytype:['1'],
      isactive:false,
      ispermanent:false,
    })
  }

  onClear() {
    this.submitted = false;
    this.notification.error('Not Submitted');
    this.addnewsform.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.addnewsform.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
        if (this.addnewsform.invalid) {
            return;
        }else{
          this.formdata=this.addnewsform.value;
          console.log(this.formdata)
          if(this.formdata.isactive){
            var isactive=1
          }else{
            var isactive=0
          }
          if(this.formdata.ispermanent){
            var ispermanent=1
          }else{
            var ispermanent=0
          } 
          var data={
            "displayType":this.formdata.displaytype,
            "isActive":isactive,
            "isPermanent":ispermanent,
            "title":this.formdata.ticker
          };
          console.log(data)
          this.newsticker.AddTicker(data).subscribe(resp=>{
            if (resp.status == "Success") {
              this.notification.success(resp.result);
              setTimeout(()=>{this.router.navigateByUrl("/newsticker")},2000);
            }else{
              this.notification.error(resp.result);
            }
          })
        }
  }

}
