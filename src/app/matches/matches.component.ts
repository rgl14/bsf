import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;

  constructor(private getreports:ReportsService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100, sortable: true,lockPosition:true,suppressNavigable:true},
      {headerName: 'Title', field: 'title', sortable: true, width: 500,cellRendererFramework:NavigationcellComponent,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Sport', field: 'sport', width: 100},
      {headerName: 'Date', field: 'dateTime', sortable: true, width: 200},
      // {headerName: 'Type', field: 'type', width: 150},
      {headerName: 'Declared', field: 'declared', width: 200},
      {headerName: 'Won By', field: 'wonBy', width: 200},
      {headerName: 'Profit / Loss', field: 'pNl', width: 200, sortable: true,valueFormatter: balanceFormatter,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
    ]; 

    function balanceFormatter(params){
      var twodecimalvalue=parseFloat(params.value).toFixed(2);
      return twodecimalvalue;
}

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';


    this.gridOptions.paginationPageSize=10;
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

  ngOnInit() {
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.getreports.GetAllMatchPnl().subscribe(resp=>{
      this.rowData=resp.data;
    })
  }

}
