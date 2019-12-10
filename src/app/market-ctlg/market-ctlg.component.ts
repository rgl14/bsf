import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { SportDataService } from '../services/sport-data.service';
import { ImportSignalrService } from '../services/import-signalr.service';

@Component({
  selector: 'app-market-ctlg',
  templateUrl: './market-ctlg.component.html',
  styleUrls: ['./market-ctlg.component.css']
})
export class MarketCtlgComponent implements OnInit {

  marketCtlgData = [];
  MktSettingsPckgList = [];
  selectedPkg = "";

  constructor(
    private sportService: SportDataService,
    private ISService: ImportSignalrService,
    private notifyService: NotificationService) { }

  ngOnInit() {
    this.getMarketCtlg();
    this.getMktSettingsPckgList();
  }

  getMktSettingsPckgList() {
    this.sportService.GetMktSettingsPckgList().subscribe(data => {
      this.MktSettingsPckgList = data.data;
    }, err => {
      console.log(err);
    })
  }

  getMarketCtlg() {
    this.sportService.GetMarketCtlg().subscribe(data => {
      this.marketCtlgData = data.data;
      console.log(this.marketCtlgData);

    }, err => {
      console.log(err);
    })
  }

  ImportMarket(sportName, sportId, tournamentName, tournamentId, matchName, matchId, matchDate, marketName, marketId) {
    console.log(this.selectedPkg);

    if (!this.selectedPkg) {
      this.notifyService.error('Please select one package in the package list!')
      return false;
    }
    let importMarketData = {
      "marketId": marketId,
      "marketName": marketName,
      "matchDate": matchDate,
      "matchId": matchId,
      "matchName": matchName,
      "numRunners": 2,
      "packageId": this.selectedPkg,
      "sportId": sportId,
      "sportName": sportName,
      "tournamentId": tournamentId,
      "tournamentName": tournamentName
    }

    console.log(importMarketData);

    this.sportService.ImportMarket(importMarketData).subscribe(data => {
      console.log(data);

      let marketIds = [marketId];


      if (data.hubAddress && data.description.status == "Success") {
        this.ISService.connectMarket(data.hubAddress, marketIds);

        this.ISService.IMSource.subscribe(runner => {
          console.log(runner);

          if (runner) {
            this.ISService.Unsuscribemarket(marketIds);
            this.notifyService.success(data.description.result);
            this.FetchRunnersData(marketId);
          }
        })
      }
      else {
        this.notifyService.error(data.description.result)
      }

    }, err => {
      console.log(err);
    })
  }

  FetchRunnersData(marketId) {
    this.sportService.FetchRunnersData(marketId).subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }
}
