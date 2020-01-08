import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { SportDataService } from '../services/sport-data.service';
import { FancySignalrService } from '../services/fancy-signalr.service';
import { MarketSignalrService } from '../services/market-signalr.service';
import { FancyService } from '../services/fancy.service';
import _ from "lodash";
import { Subscription } from 'rxjs';
import { UsermanagementService } from '../services/usermanagement.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-marketanalysis',
  templateUrl: './marketanalysis.component.html',
  styleUrls: ['./marketanalysis.component.css']
})
export class MarketanalysisComponent implements OnInit,OnDestroy {
  sportBfId: string;
  bfId: string;
  matchid: string;
  analysiseventdata: Subscription;
  analysisevent: any;
  analysisdata: Subscription;
  Event: any;
  Eventname: any;
  EventDate: any;
  isInplay: any;
  tvConfig: any;
  fancyData=[];
  AllMarkets: any;
  EventMarketId: any;
  Fancysignalrdata: Subscription;
  BookRates=[];
  curTime: any;
  fancyname: any;
  fancybook=[];
  admReport: any;
  bookData: any;
  bmBookData: any;
  MObetdata=[];
  fancyBetdata=[];
  bmBetdata=[];
  oldrunnerData: any;
  isMarketSignalr: boolean=false;
  isFancySignalr: boolean=false;
  userId: any;
  MatchBetHide: boolean=true;
  fancyBetHide: boolean=true;
  bmBetHide: boolean=true;
  MatchTvHide: boolean;
  matchBfId: string;
  liveUrl: string;
  liveUrlSafe: any;
  eventfancybook:any;
  fancybetArray=[];
  constructor(
    private usermanagement:UsermanagementService,
    private route:ActivatedRoute,
    private analysisservice:AnalysisSignalrService,
    private sportdataservice:SportDataService,
    private fancysignalrservice:FancySignalrService,
    private marketservice:MarketSignalrService,  
    private sanitizer: DomSanitizer,
    private fancyservice:FancyService
    ) { }

    ngOnInit() {
      this.sportBfId=this.route.snapshot.paramMap.get('sportBfId');
      this.matchBfId=this.route.snapshot.paramMap.get('bfId');
      this.matchid=this.route.snapshot.paramMap.get('id');
      
      this.usermanagement.getAccountInfo().subscribe(resp=>{
        // console.log(resp.data);
        this.userId=resp.data.userId;
        this.ConnectAnalysisdata(this.userId);
      })
      
      
    }
    
    ConnectAnalysisdata(userId){
      var count=0;
      this.analysisdata=this.analysisservice.analysisSource.subscribe(resp=>{
        if(resp!=null){
          // console.log(resp);
          count++;
          this.analysiseventdata=resp;
          this.Event=this.analysiseventdata[this.sportBfId].eventList[this.matchBfId];
          console.log(this.Event)
          this.Eventname=this.Event.name;
          this.EventDate=this.Event.eventDate;
          this.isInplay=this.Event.isInplay;
          this.tvConfig=this.Event.tvConfig;
          this.admReport=this.Event._admReport[userId];
          this.eventfancybook=this.admReport.fancyBook;
          this.bookData=this.admReport.bookData;
          this.bmBookData=this.admReport.bmBookData;
          if(this.admReport.moBetdata!=null ){
            this.MObetdata=this.admReport.moBetdata;
          }
          if(this.admReport.fancyBetdata!=null ){
            this.fancyBetdata=this.fancybetformat(this.admReport.fancyBetdata);
          }
          if(this.admReport.bmBetdata!=null ){
            this.bmBetdata=this.admReport.bmBetdata;
          }
          if(!this.isFancySignalr){
            // this.fancyData=this.Event.fancyList;
          }
          if(!this.isMarketSignalr){
            this.AllMarkets=this.Event.mktList;
            // console.log(this.AllMarkets);
          }
  
          if(this.bookData.runner1name!=null){
          _.forEach(this.AllMarkets[0].runnerData,(item,index) => {
            if(this.AllMarkets[0].runnerData[index].runnerName==this.bookData.runner1name){
              this.AllMarkets[0].runnerData[index]["book"]=this.bookData.runner1Book;
            }
            if(this.AllMarkets[0].runnerData[index].runnerName==this.bookData.runner2name){
              this.AllMarkets[0].runnerData[index]["book"]=this.bookData.runner2Book;
            }
            if(this.AllMarkets[0].runnerData[index].runnerName==this.bookData.runner3name){
              this.AllMarkets[0].runnerData[index]["book"]=this.bookData.runner3Book;
            }
          });
            
          //   this.AllMarkets[0].runnerData[this.bookData.runner1name]["book"]=this.bookData.runner1Book;
          //   this.AllMarkets[0].runnerData[this.bookData.runner2name]["book"]=this.bookData.runner2Book;
          //   if(this.bookData.runner3name!=null){
          //     this.AllMarkets[0].runnerData[this.bookData.runner3name]["book"]=this.bookData.runner3Book;
          //   }
          }
          this.EventMarketId=this.Event.mktList[0].bfId;
          if(count==1){
            this.getHubaddress();
            this.fancysignalrservice.connectFancy('http://173.249.43.228:11111',this.matchid);
          }
        }
      })
    }
    getHubaddress(){
      this.sportdataservice.HubAddress(this.EventMarketId).subscribe(resp=>{
        // console.log(resp)
        if(resp!=null){
          this.marketservice.connectMarket(resp,this.AllMarkets);
        }
        this.marketservice.marketSource.subscribe(runner=>{
          if(runner!=null){
            this.isMarketSignalr=true;
            // console.log(runner)
            let marketIndex = _.findIndex(this.AllMarkets, function(o) {
              return o.bfId == runner.marketid;
            });
            if (marketIndex > -1) {
              // this.selectionid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
              let MktRunnerData = this.AllMarkets[marketIndex].runnerData;
              // this.noSpaceMarketid = runner.marketid.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
              var txt = runner.runner.replace(/[^a-z0-9\s]/gi, "").replace(/[_\s]/g, "_");
              _.forEach(MktRunnerData, (item, index) => {
                if (item.runnerName == runner.runner) {
                  this.oldrunnerData = MktRunnerData[index];
                  this.AllMarkets[marketIndex].runnerData[index] = runner;
                  this.AllMarkets[marketIndex].runnerData[index]["runnerName"] =runner.runner;
                  this.AllMarkets[marketIndex].runnerData[index]["status"] =runner.runnerStatus;
                  if(this.AllMarkets[marketIndex].runnerData[index].runnerName==this.bookData.runner1name){
                    this.AllMarkets[marketIndex].runnerData[index]["book"]=this.bookData.runner1Book;
                  }
                  if(this.AllMarkets[marketIndex].runnerData[index].runnerName==this.bookData.runner2name){
                    this.AllMarkets[marketIndex].runnerData[index]["book"]=this.bookData.runner2Book;
                  }
                  if(this.AllMarkets[marketIndex].runnerData[index].runnerName==this.bookData.runner3name){
                    this.AllMarkets[marketIndex].runnerData[index]["book"]=this.bookData.runner3Book;
                  }
                    if ((item.back1 != runner.back1 ||item.backSize1 != runner.backSize1)) {
                      $( "#selection_"+ txt + " .back-1").addClass("spark");
                      const back1 = $("#selection_"+ txt + " .back-1");
                      this.removeChangeClass(back1);
                    }
                    if ((item.back2 != runner.back2 ||item.backSize2 != runner.backSize2) ) {
                      $("#selection_" + txt + " .back-2").addClass("spark");
                      const back2 = $("#selection_"+ txt + " .back-2");
                      this.removeChangeClass(back2);
                    }
                    if ((item.back3 != runner.back3 ||item.backSize3 != runner.backSize3) ) {
                      $("#selection_"+ txt + " .back-3").addClass("spark");
                      const back3 = $("#selection_"+ txt + " .back-3");
                      this.removeChangeClass(back3);
                    }
      
                    if ((item.lay1 != runner.lay1 ||item.laySize1 != runner.laySize1) ) {
                      $("#selection_"+ txt + " .lay-1").addClass("spark");
                      const lay1 = $("#selection_"+ txt + " .lay-1");
                      this.removeChangeClass(lay1);
                    }
                    if (
                      (item.lay2 != runner.lay2 ||item.laySize2 != runner.laySize2) ) {
                      $("#selection_"+ txt + " .lay-2").addClass("spark");
                      const lay2 = $("#selection_"+ txt + " .lay-2");
                      this.removeChangeClass(lay2);
                    }
                    if ((item.lay3 != runner.lay3 || item.laySize3 != runner.laySize3) ) {
                      $("#selection_" + txt + " .lay-3").addClass("spark");
                      const lay3 = $("#selection_"+ txt + " .lay-3");
                      this.removeChangeClass(lay3);
                    }
                  // }
                }
              });
            }
          }
        })
        
        this.Fancysignalrdata=this.fancysignalrservice.fancySource.subscribe(fancy=>{
          if(fancy!=null){
            // console.log(fancy);
            this.isFancySignalr=true;
            this.fancyData=fancy.data;
            _.forEach(this.fancyData, (item, index) => {
              if(this.eventfancybook!=null){
              item["book"]=this.eventfancybook[item.id];
              }
            })
            this.BookRates=fancy.bookRates;
            this.curTime=fancy.curTime;
          }
        })
      })
    }
    fancybetformat(fancybetdata){
      this.fancybetArray=[];
      _.forEach(fancybetdata, (item, index) => {
        this.fancybetArray.push(item)
      })
      return this.fancybetArray;
    }
    removeChangeClass(changeClass) {
      setTimeout(() => {
        changeClass.removeClass("spark");
      }, 300);
    }

    ToggleAccordian(state) {
      if (state == '1') {
        this.MatchTvHide = !this.MatchTvHide;
        if (this.MatchTvHide && this.Event) {
  
          if (this.Event.tvConfig != null) {
            this.liveUrl = "https://shivexch.com/tv_api/live_tv/index.html?token=3af0f960-daba-47ea-acc2-a04b7ecf44bf&mtid=" + this.matchBfId;
            this.liveUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.liveUrl);
          }
          else {
            this.liveUrl = "https://videoplayer.betfair.com/GetPlayer.do?tr=1&eID=" + this.matchBfId + "&width=450&height=290&allowPopup=true&contentType=viz&statsToggle=hide&contentOnly=true"
            this.liveUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.liveUrl);
          }
        }
      }
      if (state == '2') {
        this.MatchBetHide = !this.MatchBetHide;
      }
      if (state == '3') {
        this.fancyBetHide = !this.fancyBetHide;
      }
      if (state == '4') {
        this.bmBetHide = !this.bmBetHide;
      }
    }
  
    getAnalysisfancyBook(id,name){
      this.fancyname=name;
      this.fancyservice.GetAnalysisFancyBook(id).subscribe(resp=>{
        this.fancybook=resp.data;
      })
    }
  
    trackByfancyId(index,item){
      // console.log(item.id)
      //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
      return item.id;
     }
     trackByFn(index,item){
      return item.id;
     }
     ngOnDestroy(){
      this.analysisdata.unsubscribe();
      this.marketservice.UnsuscribeMarkets(this.AllMarkets);
      this.Fancysignalrdata.unsubscribe();
      this.fancysignalrservice.UnsuscribeFancy(this.matchid);
      this.isMarketSignalr=false;
      this.isFancySignalr=false;
    }

}
