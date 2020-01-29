import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ReportsService } from '../services/reports.service';
import { SharedataService } from '../services/sharedata.service';
import { SportDataService } from '../services/sport-data.service';

@Component({
  selector: 'app-tournamentpnl',
  templateUrl: './tournamentpnl.component.html',
  styleUrls: ['./tournamentpnl.component.css']
})
export class TournamentpnlComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  gridApi:any;
  gridColumnApi:any;
  paginationSetPageSize:number;
  paginationNumberFormatter:any;
  rowData=[];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  userId: any;
  sportsList: any;
  sport:any='';
  sportbfId: any;
  constructor(private getreports:ReportsService,private sharedata:SharedataService,private SportSettingdata:SportDataService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'date', sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Entry', field: 'entry', sortable: true, width: 500,cellStyle: {color: '#0084e7' }},
      {headerName: 'Debit', field: 'debit', sortable: true, width: 150,cellStyle: {color: 'red'}},
      {headerName: 'Credit', field: 'credit', sortable: true, width: 150,cellStyle: {color: 'green'}},
      {headerName: 'Balance', field: 'balance', sortable: true, width: 180,cellStyle: {color: 'green','font-weight':'bolder'}},
      {headerName: 'Note', field: 'note', sortable: true, width: 270},
    ]; 
    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';
    
    this.gridOptions.paginationPageSize=50;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }

  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  
  ngOnInit(){

  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.SportSettingdata.GetSportList().subscribe(resp=>{
      this.sportsList=resp.tickerList;
    })
    this.sharedata.AccountInfoSource.subscribe(resp=>{
      if(resp!=null){
        this.userId=resp.userId
        this.getsportpnl();
      }
    })
    
  }

  getsportpnl(){
    this.sportbfId=this.sport.betfairId;
    if(this.sportbfId==undefined){
      this.sportbfId="0";
    }
    this.getreports.GetTournamentPnl(this.userId,this.sportbfId).subscribe(resp=>{
      // console.log(resp)
      this.rowData=resp.data;
    })
  }

}
