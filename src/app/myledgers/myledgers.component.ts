import { Component, OnInit, HostListener, ViewChild  } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import * as _moment from "moment";
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
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
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.alwaysShowCalendars = true;
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'date', sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Entry', field: 'entry', sortable: true, width: 500,cellStyle: {color: '#0084e7'}},
      {headerName: 'Debit', field: 'debit', sortable: true, width: 150,cellStyle: {color: 'red'}},
      {headerName: 'Credit', field: 'credit', sortable: true, width: 150,cellStyle: {color: 'green'}},
      {headerName: 'Balance', field: 'balance', sortable: true, width: 180,cellStyle: {color: 'green','font-weight':'bolder'}},
      {headerName: 'Note', field: 'note', sortable: true, width: 270},
    ]; 
    this.gridOptions.rowData = [
      { date: '08 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '12000.00',credit: '--',balance: '160000.00',note:'--' },
      { date: '04 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '10000.00',balance: '100000.00',note:'--' },
      { date: '06 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '10000.00',credit: '--',balance: '180000.00',note:'--' },
      { date: '05 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '11000.00',balance: '100000.00',note:'--' },
      { date: '06 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '10000.00',credit: '--',balance: '180000.00',note:'--' },
      { date: '05 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '11000.00',balance: '100000.00',note:'--' },
      { date: '08 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '16000.00',balance: '180000.00',note:'--' },
      { date: '06 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '10000.00',credit: '--',balance: '180000.00',note:'--' },
      { date: '08 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '16000.00',balance: '180000.00',note:'--' },
      { date: '06 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '10000.00',credit: '--',balance: '180000.00',note:'--' },
      { date: '08 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '16000.00',balance: '180000.00',note:'--' },
      { date: '05 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '11000.00',balance: '100000.00',note:'--' },
      { date: '04 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '--',credit: '10000.00',balance: '100000.00',note:'--' },
      { date: '08 Oct 19', entry: 'Guyana Amazon Warriors vs Jamaica Tallawahs	', debit: '12000.00',credit: '--',balance: '160000.00',note:'--' },
    ];
    this.gridOptions.paginationPageSize=50;
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
@ViewChild(BsDaterangepickerDirective, { static: false }) datepicker: BsDaterangepickerDirective;
  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }
  
  ngOnInit(){

  }
  
}
