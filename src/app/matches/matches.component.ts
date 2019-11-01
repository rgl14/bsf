import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';

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

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100, sortable: true,lockPosition:true,suppressNavigable:true},
      {headerName: 'Title', field: 'title', sortable: true, width: 300,cellRendererFramework:NavigationcellComponent,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Sport', field: 'sport', width: 100},
      {headerName: 'Date', field: 'date', sortable: true, width: 200},
      {headerName: 'Type', field: 'type', width: 150},
      {headerName: 'Declared', field: 'Declared', width: 200},
      {headerName: 'Won By', field: 'wonby', width: 200},
      {headerName: 'Profit / Loss', field: 'pnl', width: 200, sortable: true,cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
    ]; 

    this.gridOptions.rowData = [
      {id : '1',date : '01-sep-2019',title : 'Western Australia vs Tasmania',sport : 'Cricket',Declared : 'Yes',pnl : '50000.00',type:'T-20',wonby:'Tasmania'},
     {id : '2',date : '02-sep-2019',title : 'St Lucia Zouks vs St Kitts and Nevis Patriots',sport : 'Tennis',Declared : 'Yes',pnl : '-40000.00',type:'One-day',wonby:'St Lucia Zouks'},
     {id : '3',date : '06-sep-2019',title : 'Betis vs Levante',sport : 'Soccer',Declared : 'Yes',pnl : '880000.00',type:'Test',wonby:'Betis'},
     {id : '4',date : '07-sep-2019',title : 'Bangladesh vs Afghanistan',sport : 'Cricket',Declared : 'No',pnl : '-90000.00',type:'--',wonby:'Afghanistan'},
    ];

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

}
