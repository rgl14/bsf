import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';

@Component({
  selector: 'app-rolelist',
  templateUrl: './rolelist.component.html',
  styleUrls: ['./rolelist.component.css']
})
export class RolelistComponent implements OnInit {

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
      {headerName: 'Role Name', field: 'rolename', sortable: true, width: 350,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Role Discription', field: 'rolsedesc', sortable: true, width: 350,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Actions', field: '', sortable: true, width: 650,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      { isactive:1,rolename:'Add Client Fancy and Book Maker',rolsedesc:'only create client fancy and book maker',id: '1' },
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
