import { Component, OnInit} from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {CustomcellbuttonsComponent} from '../customcellbuttons/customcellbuttons.component';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';

@Component({
  selector: 'app-newsticker',
  templateUrl: './newsticker.component.html',
  styleUrls: ['./newsticker.component.css']
})
export class NewstickerComponent implements OnInit {

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
      {headerName: 'Ticker', field: 'tickername', sortable: true, width: 800,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Active', field: 'isactive', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 500,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      { isactive:1,tickername:'Welcome To BSF',id: '1' },
      { isactive:1,tickername:' Welcome To XYZ.com !! Note Sabhi Agent ko inform Kiya Jata Hai Ki Aaj Se [ XYZ.Net ] & [ XYZ.Net ] Jo Live Report Hai Vo Aaj Se Point Me Dhikhengi 1 Point Ki Value 100 Rupees Hogi',id: '2' },
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
