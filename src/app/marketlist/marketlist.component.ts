import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';

@Component({
  selector: 'app-marketlist',
  templateUrl: './marketlist.component.html',
  styleUrls: ['./marketlist.component.css']
})
export class MarketlistComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 75,lockPosition:true,suppressNavigable:true},
      {headerName: 'Market Name', field: 'mktname', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Tournament Name', field: 'tourname', sortable: true, width: 350,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match Date', field: 'matchdate', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Status', field: 'status', sortable: true, width: 75,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Is Active', field: 'isactive', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Bet Allow', field: 'betallow', sortable: true, width: 100,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 350,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      { isactive:1,betallow:1,mktname:'Match Odds',matchname:'Ireland v Netherlands',tourname:'ICC World T20 Qualifiers',status:'OPEN',matchdate:'2019-11-01 15:40:00',id: '1' },
      { isactive:1,betallow:1,mktname:'Match Odds',matchname:'Papua New Guinea v Namibia',tourname:'ICC World T20 Qualifiers',status:'OPEN',matchdate:'2019-11-01 21:00:00',id: '2' },
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
