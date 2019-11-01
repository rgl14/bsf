import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

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
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'Date/Time', field: 'date', sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Entry', field: 'entry', sortable: true, width: 500,cellStyle: {color: '#0084e7' }},
      {headerName: 'Debit', field: 'debit', sortable: true, width: 150,cellStyle: {color: 'red'}},
      {headerName: 'Credit', field: 'credit', sortable: true, width: 150,cellStyle: {color: 'green'}},
      {headerName: 'Balance', field: 'balance', sortable: true, width: 180,cellStyle: {color: 'green','font-weight':'bolder'}},
      {headerName: 'Note', field: 'note', sortable: true, width: 270},
    ]; 
    this.gridOptions.rowData = [
      { date: '08 Oct 19', entry: 'IPL', debit: '12000.00',credit: '--',balance: '160000.00',note:'--' },
      { date: '08 Oct 19', entry: 'Big Bash', debit: '12000.00',credit: '--',balance: '160000.00',note:'--' },
      { date: '08 Oct 19', entry: 'ODI Internationals', debit: '12000.00',credit: '--',balance: '160000.00',note:'--' },
      { date: '08 Oct 19', entry: 'Test Matches', debit: '12000.00',credit: '--',balance: '160000.00',note:'--' },
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
  
  ngOnInit(){

  }

}
