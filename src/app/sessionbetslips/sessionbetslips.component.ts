import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { AnalysisSignalrService } from '../services/analysis-signalr.service';

@Component({
  selector: 'app-sessionbetslips',
  templateUrl: './sessionbetslips.component.html',
  styleUrls: ['./sessionbetslips.component.css']
})
export class SessionbetslipsComponent implements OnInit {
  gridOptions: GridOptions;
  title: string;
  gridApi: any;
  gridColumnApi: any;
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;

  constructor(private route:ActivatedRoute,private analysisservice:AnalysisSignalrService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'userId', width: 100,lockPosition:true,suppressNavigable:true},
      {headerName: 'Username', field: 'userName', sortable: true, width: 200,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Name', field: 'name', sortable: true, width: 150},
      {headerName: 'Fix Limit', field: 'fixLimit', sortable: true, width: 150},
      {headerName: 'My share (%)', field: 'myShare', sortable: true, width: 100},
      {headerName: 'Max Share (%)', field: 'maxShare', sortable: true, width: 100},
      {headerName: 'M-Comm  (%)', field: 'MComm', sortable: true, width: 100},
      {headerName: 'S-Comm  (%)', field: 'SComm', sortable: true, width: 100},
    ]; 

    

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">No Rows To Display</span>";
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
  
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
  }

  ngOnInit() {
    this.title=this.route.snapshot.paramMap.get('title');
  }

}
