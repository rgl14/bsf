import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';
import { Subscription } from 'rxjs';
import { UsermanagementService } from '../services/usermanagement.service';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';

@Component({
  selector: 'app-betslips',
  templateUrl: './betslips.component.html',
  styleUrls: ['./betslips.component.css']
})
export class BetslipsComponent implements OnInit,OnDestroy {
  gridOptions: GridOptions;
  title: string;
  gridApi: any;
  gridColumnApi: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  matchBfId: string;
  sportBfId: string;
  analysisdata: Subscription;
  analysiseventdata: any;
  Event: any;
  userId: any;
  admReport: any;
  bookData: any;
  MObetdata=[];
  rowData=[];

  constructor(private route:ActivatedRoute,private usermanagement:UsermanagementService,private analysisservice:AnalysisSignalrService,) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      // {headerName: 'ID', field: 'userId', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Runner', field: 'runnerName', sortable: true, width: 200,cellStyle: {color: '#414141','font-weight':'bolder'}},
      {headerName: 'Bet type', field: 'backLay', sortable: true, width: 150},
      {headerName: 'Client', field: 'clUsername', sortable: true, width: 150,cellStyle: {color: '#414141','font-weight':'bolder'}},
      {headerName: 'Odds', field: 'odds', sortable: true, width: 100},
      {headerName: 'Stake', field: 'stake', sortable: true, width: 100,valueFormatter: balanceFormatter},
      {headerName: 'P | L', field: 'MComm', sortable: true, width: 100,valueFormatter: profitlossFormatter,cellStyle: {color: '#414141','font-weight':'bolder'}},
      {headerName: 'Time', field: 'date', sortable: true, width: 150,cellStyle: {color: 'red','font-weight':'bolder'}},
      {headerName: 'ID', field: 'id', sortable: true, width: 100},
      {headerName: 'Action', field: '', sortable: true, width: 100,cellRendererFramework:CustomcellbuttonsComponent},
      {headerName: 'IP', field: 'sourceInfo', sortable: true, width: 100},
      {headerName: 'Master', field: 'masterUsername', sortable: true, width: 100},
      {headerName: 'Dealer', field: 'agentUsername', sortable: true, width: 100},
    ]; 

    function profitlossFormatter(params){
      var rowvalue=params.data;
      // console.log(rowvalue)
      var pnlodds=rowvalue.odds-1;
      var pnlstake=rowvalue.stake;
      var pnlvalue=pnlodds*pnlstake;
       var totalvalue=pnlvalue.toFixed(2);
      // console.log(pnlvalue)
      return totalvalue.toString();
    }
    function balanceFormatter(params){
      var twodecimalvalue=parseFloat(params.value).toFixed(2);
      return twodecimalvalue;
    }
    
    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">No Rows To Display</span>";
    // all rows assigned CSS class 'my-green-class'
    this.gridOptions.rowClass = 'my-green-class';
    this.gridOptions.getRowClass = function(params:any) {
      if (params.node.rowIndex % 2 === 0) {
        return 'my-shaded-effect';
      }
    }
  }

  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
  }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
    this.sportBfId=this.route.snapshot.paramMap.get('sportBfId');
    this.matchBfId=this.route.snapshot.paramMap.get('bfId');
    this.usermanagement.getAccountInfo().subscribe(resp=>{
      // console.log(resp.data);
      this.userId=resp.data.userId;
      this.ConnectAnalysisdata(this.userId);
    })
  }
  ConnectAnalysisdata(userId){
    this.analysisdata=this.analysisservice.analysisSource.subscribe(resp=>{
      if(resp!=null){
        this.analysiseventdata=resp;
          this.Event=this.analysiseventdata[this.sportBfId].eventList[this.matchBfId];
          console.log(this.Event);
          this.admReport=this.Event._admReport[userId];
          this.bookData=this.admReport.bookData;
          if(this.admReport.moBetdata!=null ){
            this.rowData=this.admReport.moBetdata;
          }
      }
    })
  }
  ngOnDestroy(){
    this.analysisdata.unsubscribe();
  }

}
