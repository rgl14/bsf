import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {CustomcellbuttonsComponent} from '../customcellbuttons/customcellbuttons.component';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';

@Component({
  selector: 'app-bookmaker',
  templateUrl: './bookmaker.component.html',
  styleUrls: ['./bookmaker.component.css']
})
export class BookmakerComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Book Type', field: 'type', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match', field: 'matchname', sortable: true, width: 300,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Status', field: 'status', sortable: true, width: 100},
      {headerName: 'Rate', field: '', sortable: true, width: 100,cellRendererFramework:RatesnavigationComponent},
      {headerName: 'Active', field: 'isactive', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Bet Allow', field: 'isbetallow', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Settle', field: '', sortable: true, width: 100,cellRendererFramework:NavigationcellComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 400,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      { type:'Book Maker',isbetallow:1,isactive:1,matchname:'Singapore v Netherlands',id: '1',status:'OPEN' },
      { type:'Book Maker',isbetallow:1,isactive:1,matchname:'Central Punjab v Khyber Pakhtunkhwa',id: '2',status:'SUSPENDED' },
      { type:'Even Odd',isbetallow:1,isactive:1,matchname:'Singapore v Netherlands',id: '3',status:'OPEN' },
      { type:'Even Odd',isbetallow:1,isactive:1,matchname:'Central Punjab v Khyber Pakhtunkhwa',id: '6',status:'OPEN' },
      { type:'TO WIN THE TOSS',isbetallow:1,isactive:1,matchname:'Singapore v Netherlands',id: '7',status:'OPEN' }
    ];

    this.gridOptions.paginationPageSize=10;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.gridOptions.getRowHeight = function(params:any) {
      return 45;
    }
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

  ngOnInit() {
  }

}
