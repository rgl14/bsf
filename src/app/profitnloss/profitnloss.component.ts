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
  selectfromdate: string;
  selecttodate: any;
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

  constructor(private getreports:ReportsService) {
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'dateTime', sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Match Id', field: 'matchId', sortable: true, width: 150,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Match Title', field: 'matchTitle', sortable: true, width: 450,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Match Earnings', field: 'matchEarning', sortable: true, width: 200,valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Commission Earnings', field: 'commEarning', sortable: true, width: 200,valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
      {headerName: 'Total Earnings', field: 'totalEarning', sortable: true, width: 250,valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}}
    ]; 

    function balanceFormatter(params){
      var twodecimalvalue=parseInt(params.value).toFixed(2);
      return twodecimalvalue;
    }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">No Rows To Display</span>";


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
        this.fromdate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00";
        this.todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 23:59:00";
        let pnldates={
          "fromdate":this.fromdate,
          "todate":this.todate
        }
      this.getreports.GetProfitLoss('',pnldates).subscribe(resp=>{
        this.rowData=resp.data;
        this.allTimeTotal=resp.allTimeTotal;
      })
  }

  profitandloss(value){
    console.log(value)
    this.selectfromdate=this.convertfrom(value[0]);
    this.selecttodate=this.convertto(value[1]);
    console.log(this.selectfromdate,this.selecttodate);
     let pnldates={
       "fromdate":this.selectfromdate,
       "todate":this.selecttodate
     }
     this.getreports.GetProfitLoss('',pnldates).subscribe(resp =>{
       this.rowData=resp.data;
     })
  }

  convertfrom(str) {
    var date = new Date(str);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " 00:00:00"
  }
  convertto(str) {
    var date = new Date(str);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " 23:59:00"
  }

  
    
    onItemSelect(item:any){
        console.log(this.selectedItems);
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
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }

}
