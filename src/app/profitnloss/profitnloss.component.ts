import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-profitnloss',
  templateUrl: './profitnloss.component.html',
  styleUrls: ['./profitnloss.component.css']
})
export class ProfitnlossComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  gridApi: any;
  gridColumnApi: any;
  date: Date;
  fromdate: string;
  todate: string;
  selectfromdate: any;
  selecttodate: any;
  selectfromtime: any;
  selecttotime: any;
  dropdownList=[];
  selectedItems=[];
  dropdownSettings: { };
  bsRangeValue: Date[];
  bsValue = new Date();
  maxDate = new Date();
  allTimeTotal: any;
  myDateValue:Date;
  datepicker: Date;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  matchEarnings: any;
  selectedTotal: any;
  totalEarnings: any;
  defaultColDef: { sortable: boolean; };

  constructor(private getreports:ReportsService) {
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'dateTime',sort: "desc", sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Match Id', field: 'matchId', sortable: true, width: 150,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Match Title', field: 'matchTitle', sortable: true, width: 450,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Match Earnings', field: 'matchEarning', sortable: true, width: 200,valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Commission Earnings', field: 'commEarning', sortable: true, width: 200,valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Total Earnings', field: 'totalEarning', sortable: true, width: 250,valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}}
    ]; 
    

    function balanceFormatter(params){
      var twodecimalvalue=parseFloat(params.value).toFixed(2);
      return twodecimalvalue;
    }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';


    this.gridOptions.paginationPageSize=50;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };

    
    this.selectfromdate = new Date(new Date().setDate(new Date().getDate() - 1));
    this.selecttodate = new Date();
    this.selectfromtime = new Date(new Date().setHours(9, 59, 0, 0));
    this.selecttotime = new Date(new Date().setHours(9,59,0,0));
  }

  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
    this.dropdownList = [
      {"id":1,"itemName":"Soccer"},
      {"id":2,"itemName":"Tennis"},
      {"id":4,"itemName":"Cricket"},
    ];
this.selectedItems = [];
this.dropdownSettings = { 
          singleSelection: false, 
          text:"Select Sports",
          selectAllText:'Select All',
          unSelectAllText:'UnSelect All',
          enableSearchFilter: true,
          classes:"myclass custom-class"
        };    
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
        var days = 1;
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        this.date = last
        this.fromdate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 09:59:00";
        this.todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 09:59:00";
        let pnldates={
          "fromdate":this.fromdate,
          "todate":this.todate
        }
      this.getreports.GetProfitLoss('',pnldates).subscribe(resp=>{
        this.rowData=resp.data;
        this.allTimeTotal=resp.allTimeTotal;
        this.matchEarnings=resp.matchEarnings;
        this.selectedTotal=resp.selectedTotal;
        this.totalEarnings=resp.totalEarnings;
      })
  }

  profitandloss(){
    // console.log(value)
    // this.selectfromdate=this.convertfrom(value[0]);
    // this.selecttodate=this.convertto(value[1]);
    console.log(this.selectfromdate,this.selecttodate);
     let pnldates={
       "fromdate":this.getFromDateAndTime(),
       "todate":this.getToDateAndTime()
     }
     this.getreports.GetProfitLoss('',pnldates).subscribe(resp =>{
       this.rowData=resp.data;
     })
  }

  fromDateChange(date) {
    console.log(date);
  }
  toDateChange(date) {
    console.log(date);
  }

  fromTimeChange(time) {
    console.log(time);
  }

  toTimeChange(time) {
    console.log(time);
  }

  getFromDateAndTime() {
    return `${this.selectfromdate.getFullYear()}-${this.selectfromdate.getMonth() + 1}-${this.selectfromdate.getDate()} ${this.selectfromtime.getHours()}:${this.selectfromtime.getMinutes()}:${this.selectfromtime.getSeconds()}`;
  }
  getToDateAndTime() {
    return `${this.selecttodate.getFullYear()}-${this.selecttodate.getMonth() + 1}-${this.selecttodate.getDate()} ${this.selecttotime.getHours()}:${this.selecttotime.getMinutes()}:${this.selecttotime.getSeconds()}`;
  }

  convertfrom(str) {
    var date = new Date(str);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
  convertto(str) {
    var date = new Date(str);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  
    
    onItemSelect(item:any){
        // console.log(this.selectedItems);
        console.log(this.bsRangeValue)
        this.selectfromdate=this.convertfrom(this.bsRangeValue[0]);
        this.selecttodate=this.convertto(this.bsRangeValue[1]);
        console.log(this.selectfromdate,this.selecttodate);
        let pnldates={
          "fromdate":this.selectfromdate,
          "todate":this.selecttodate
        }
        this.getreports.GetProfitLoss(this.selectedItems[0].id,pnldates).subscribe(resp =>{
          this.rowData=resp.data;
        })
    }
    OnItemDeSelect(item:any){
        // console.log(this.selectedItems);
        this.selectfromdate=this.convertfrom(this.bsRangeValue[0]);
        this.selecttodate=this.convertto(this.bsRangeValue[1]);
        console.log(this.selectfromdate,this.selecttodate);
        let pnldates={
          "fromdate":this.selectfromdate,
          "todate":this.selecttodate
        }
        this.getreports.GetProfitLoss(this.selectedItems[0].id,pnldates).subscribe(resp =>{
          this.rowData=resp.data;
        })
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

}
