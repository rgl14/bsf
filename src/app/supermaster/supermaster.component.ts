import { Component, OnInit,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-supermaster',
  templateUrl: './supermaster.component.html',
  styleUrls: ['./supermaster.component.css']
})
export class SupermasterComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  usertype: number;
  creatorId: string;

  constructor(private usermanagement:UsermanagementService,private route:ActivatedRoute) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this
      }
    };
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'userId',sort: "desc", minWidth: 50,lockPosition:true,suppressNavigable:true},
      {headerName: 'Username', field: 'userName', sortable: true, minWidth: 100,cellRendererFramework:NavigationcellComponent,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Name', field: 'name', sortable: true, minWidth: 100},
      {headerName: 'Fix Limit', field: 'fixLimit', sortable: true, minWidth: 125,valueFormatter: balanceFormatter},
      {headerName: 'My share (%)', field: 'myShare', sortable: true, minWidth: 75},
      {headerName: 'Max Share (%)', field: 'maxShare', sortable: true, minWidth: 75},
      {headerName: 'M-Comm  (%)', field: 'mLossingComm', sortable: true, minWidth: 75},
      {headerName: 'S-Comm  (%)', field: 'SComm', sortable: true, minWidth: 75},
      {headerName: 'Status', field: 'accStatus', minWidth: 75,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Bet Allow', field: 'betStatus', minWidth: 75,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Actions', field: '', minWidth: 250,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    function balanceFormatter(params){
      var twodecimalvalue=parseInt(params.value).toFixed(2);
      return twodecimalvalue;
    }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';

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

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
    this.creatorId=this.route.snapshot.paramMap.get('userId');
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.GetuserList();
  }

  GetuserList(){
    this.usertype=3;
    if(this.creatorId==undefined){
      this.creatorId='0';
    }
    this.usermanagement.getUserlist(this.usertype,this.creatorId).subscribe(resp=>{
      this.rowData=resp._data;
    })
  }

}
