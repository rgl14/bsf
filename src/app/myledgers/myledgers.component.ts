import { Component, OnInit, HostListener, ViewChild  } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import * as _moment from "moment";
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { SharedataService } from '../services/sharedata.service';
import { ReportsService } from '../services/reports.service';
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'app-myledgers',
  templateUrl: './myledgers.component.html',
  styleUrls: ['./myledgers.component.css']
})
export class MyledgersComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  gridApi:any;
  gridColumnApi:any;
  paginationSetPageSize:number;
  paginationNumberFormatter:any;
  rowData=[];
  selected: any;
  alwaysShowCalendars: boolean;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  accountInfo: any;
  userId: any;
  innerHeight: number;
  constructor(private sharedata:SharedataService,private getreports:ReportsService) {

    this.gridOptions = <GridOptions>{};
    this.alwaysShowCalendars = true;
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'dateTime',resizable: true, sortable: true, minWidth: 150,lockPosition:true,suppressNavigable:true},
      {headerName: 'Entry', field: 'collectionName', sortable: true ,resizable: true, minWidth: 300,cellStyle: {color: '#0084e7'}},
      {headerName: 'Debit', field: 'debit', sortable: true,resizable: true, minWidth: 100,valueFormatter: debitFormatter,cellClass:'loss'},
      {headerName: 'Credit', field: 'credit', sortable: true,resizable: true, minWidth: 100,valueFormatter: creditFormatter,cellClass:'profit'},
      {headerName: 'Balance', field: 'balance', sortable: true,resizable: true, minWidth: 100,valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Note', field: 'note', sortable: true, minWidth: 100},
    ]; 
    

    function balanceFormatter(params){
      var twodecimalvalue=parseFloat(params.value).toFixed(2);
      return twodecimalvalue;
    }

    function debitFormatter(params){
      if(params.value==null){
        return "--"
      }else{
        var twodecimalvalue=parseFloat(params.value).toFixed(2);
        return twodecimalvalue;
      }
    }

    function creditFormatter(params){
      if(params.value==null){
        return "--"
      }else{
        var twodecimalvalue=parseFloat(params.value).toFixed(2);
        return twodecimalvalue;
      }
    }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';

    this.gridOptions.paginationPageSize=200;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }


ranges: any = {
  'Today': [moment(), moment()],
  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}
// @ViewChild(BsDaterangepickerDirective, { static: false }) datepicker: BsDaterangepickerDirective;
//   @HostListener('window:scroll')
//   onScrollEvent() {
//     this.datepicker.hide();
//   }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }
  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }
  
  ngOnInit(){
    this.innerHeight=window.innerHeight;
    this.sharedata.AccountInfoSource.subscribe(data=>{
      if(data!=null){
        this.accountInfo=data;
        this.userId=data.userId;
        this.getreports.GetLedger(this.userId).subscribe(resp=>{
          this.rowData=resp.data;
        })
      }
    })
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
  }
  
}
