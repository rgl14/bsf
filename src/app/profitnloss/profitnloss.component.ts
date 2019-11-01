import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";

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

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'date', sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Match Id', field: 'mtid', sortable: true, width: 150,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Match Title', field: 'title', sortable: true, width: 450,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Match Earnings', field: 'matchearn', sortable: true, width: 200,cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
      {headerName: 'Commission Earnings', field: 'commearn', sortable: true, width: 200,cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
      {headerName: 'Total Earnings', field: 'totalearn', sortable: true, width: 250,cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}}
    ]; 

    this.gridOptions.rowData = [
      { date: '08 Oct 19', mtid: '1234',title:'Oman vs Nepal', matchearn: '15000.00',commearn: '1000.00',totalearn: '160000.00' },
      { date: '08 Oct 19', mtid: '1234',title:'Netherlands vs Hong Kong', matchearn: '16000.00',commearn: '-1000.00',totalearn: '15000.00' },
      { date: '08 Oct 19', mtid: '1234',title:'India vs South Africa', matchearn: '15000.00',commearn: '-2000.00',totalearn: '13000.00' },
      { date: '08 Oct 19', mtid: '1234',title:'	India Women vs South Africa Women', matchearn: '-15000.00',commearn: '1000.00',totalearn: '-14000.00' },
      { date: '08 Oct 19', mtid: '1234',title:'Guyana Amazon Warriors vs Barbados Tridents', matchearn: '15000.00',commearn: '1000.00',totalearn: '160000.00' },
      { date: '08 Oct 19', mtid: '1234',title:'St Kitts and Nevis Patriots vs Trinbago Knight Riders', matchearn: '15000.00',commearn: '1000.00',totalearn: '160000.00' },
      { date: '08 Oct 19', mtid: '1234',title:'Nepal vs Hong Kong', matchearn: '15000.00',commearn: '1000.00',totalearn: '160000.00' },
    ];

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

  }

}
