import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid-community";
import {CustomcellbuttonsComponent} from '../customcellbuttons/customcellbuttons.component';
import { NavigationcellComponent } from '../navigationcell/navigationcell.component';
import { ButtontogglecellComponent } from '../buttontogglecell/buttontogglecell.component';
import { UsermanagementService } from '../services/usermanagement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

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
  innerHeight: number;

  constructor(private usermanagement:UsermanagementService,private route:ActivatedRoute) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions = {
      context: {
        componentParent: this
      }
    };
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'userId',sort: "desc", minWidth: 50,lockPosition:true,suppressNavigable:true,width:75,suppressSizeToFit: true},
      {headerName: 'Username', field: 'userName', sortable: true, minWidth: 100,width:100,suppressSizeToFit: true,cellRendererFramework:NavigationcellComponent,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Name', field: 'name', sortable: true, minWidth: 100,width:100,suppressSizeToFit: true},
      {headerName: 'Fix Limit', field: 'fixLimit', sortable: true, minWidth: 125,width:100,suppressSizeToFit: true,valueFormatter: balanceFormatter},
      {headerName: 'My share (%)', field: 'myShare', sortable: true, minWidth: 75,width:100,suppressSizeToFit: true},
      {headerName: 'Max Share (%)', field: 'maxShare', sortable: true, minWidth: 75,width:125,suppressSizeToFit: true},
      {headerName: 'M-Comm  (%)', field: 'mLossingComm', sortable: true, minWidth: 75,width:100,suppressSizeToFit: true},
      {headerName: 'S-Comm  (%)', field: 'sLossingComm', sortable: true, minWidth: 75,width:100,suppressSizeToFit: true},
      {headerName: 'Status', field: 'accStatus', minWidth: 75,width:100,suppressSizeToFit: true,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Bet Allow', field: 'betStatus', minWidth: 75,width:100,suppressSizeToFit: true,cellRendererFramework:ButtontogglecellComponent},
      {headerName: 'Actions', field: 'action', minWidth: 250,width:250,suppressSizeToFit: false,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    function balanceFormatter(params){
      var twodecimalvalue=parseInt(params.value).toFixed(2);
      return twodecimalvalue;
    }

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    '<span class="ag-overlay-loading-center">NO DATA</span>';

    this.gridOptions.paginationPageSize=50;
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

  showraction(show) {
    this.gridColumnApi.setColumnVisible("action", show);
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit() {
    this.creatorId=this.route.snapshot.paramMap.get('userId');
    this.innerHeight=window.innerHeight;
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.GetuserList();
  }

  GetuserList(){
    this.usertype=6;
    if(this.creatorId==undefined || this.creatorId=='0'){
      this.creatorId='0';
      this.showraction(true);
    }else{
      this.showraction(false);
    }
    this.usermanagement.getUserlist(this.usertype,this.creatorId).subscribe(resp=>{
      this.rowData=resp._data;
    })
  }

}
