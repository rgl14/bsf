import { Component, OnInit} from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {CustomcellbuttonsComponent} from '../customcellbuttons/customcellbuttons.component';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { RatesnavigationComponent } from '../ratesnavigation/ratesnavigation.component';
@Component({
  selector: 'app-fancy',
  templateUrl: './fancy.component.html',
  styleUrls: ['./fancy.component.css']
})
export class FancyComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 50,lockPosition:true,suppressNavigable:true},
      {headerName: 'Fancy Type', field: 'type', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Fancy Name', field: 'fancyname', sortable: true, width: 225,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Match', field: 'matchname', sortable: true, width: 225,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Status', field: 'status', sortable: true, width: 100},
      {headerName: 'Mode', field: 'mode', sortable: true, width: 175,cellRendererFramework:NavigationcellComponent},
      {headerName: 'Rate', field: '', sortable: true, width: 100,cellRendererFramework:RatesnavigationComponent},
      {headerName: 'Active', field: 'isactive', sortable: true, width: 75,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Bet Allow', field: 'isbetallow', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Commission', field: 'commission', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 250,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      { type:'Advance',isbetallow:1,isactive:1,commission:0,fancyname:'8 over run CP',matchname:'Singapore v Netherlands',id: '1',status:'Open' },
      { type:'Advance',isbetallow:1,isactive:1,commission:0,fancyname:'8 over run CP',matchname:'Central Punjab v Khyber Pakhtunkhwa',id: '2',status:'Open' },
      { type:'Advance',isbetallow:1,isactive:1,commission:0,fancyname:'20 over run CP',matchname:'Singapore v Netherlands',id: '3',status:'Open' },
      { type:'Advance',isbetallow:1,isactive:1,commission:0,fancyname:'Fall of 1st wkt NED(SIN vs NED)adv	',matchname:'Singapore v Netherlands',id: '4',status:'Open' },
      { type:'Advance',isbetallow:1,isactive:1,commission:0,fancyname:'T Visee Boundaries',matchname:'Singapore v Netherlands',id: '5',status:'Open' },
      { type:'Advance',isbetallow:1,isactive:1,commission:0,fancyname:'15 over run CP',matchname:'Central Punjab v Khyber Pakhtunkhwa',id: '6',status:'Open' },
      { type:'Advance',isbetallow:1,isactive:1,commission:0,fancyname:'10 over run CP',matchname:'Singapore v Netherlands',id: '7',status:'Open' }
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
