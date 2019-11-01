import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';

@Component({
  selector: 'app-importrate',
  templateUrl: './importrate.component.html',
  styleUrls: ['./importrate.component.css']
})
export class ImportrateComponent implements OnInit {

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
      {headerName: 'Market Type', field: 'markettype', sortable: true, width: 100},
      {headerName: 'Market Name', field: 'marketname', sortable: true, width: 400,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Status', field: 'status', sortable: true, width: 100},
      {headerName: 'Setting', field: '', sortable: true, width: 100,cellRendererFramework:RatesnavigationComponent},
      {headerName: 'Limit', field: 'limit', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Active', field: 'active', width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Commission', field: 'commission', width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Bet Allow', field: 'betallow', width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 250,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      { id: '1', markettype: 'Market', marketname: 'Cricket/Deodhar Trophy/India A v India B/Match Odds',limit: 0,active: 1,betallow:0,status:'OPEN',channelno:5,commission:0},
      { id: '1', markettype: 'Market', marketname: 'Cricket/International Twenty20 Matches/New Zealand v England (1st T20)/Match Odds	',limit: 0,active: 1,betallow:0,status:'OPEN',channelno:5,commission:0},
      { id: '1', markettype: 'Market', marketname: 'Soccer/Indian Super League/Mumbai City FC v Odisha/Match Odds',limit: 0,active: 1,betallow:0,status:'OPEN',channelno:5,commission:0},
      { id: '1', markettype: 'Market', marketname: 'Soccer/Italian Serie A/AC Milan v SPAL/Match Odds',limit: 0,active: 1,betallow:0,status:'OPEN',channelno:5,commission:0},
      { id: '1', markettype: 'Market', marketname: 'Soccer/Spanish La Liga/Mallorca v Osasuna/Match Odds',limit: 0,active: 1,betallow:0,status:'OPEN',channelno:5,commission:0},
      { id: '1', markettype: 'Market', marketname: 'Soccer/Spanish La Liga/Eibar v Villarreal/Match Odds',limit: 0,active: 1,betallow:0,status:'OPEN',channelno:5,commission:0},
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
