import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { CelltextfieldComponent } from '../celltextfield/celltextfield.component';
import { CelldisabledtextfieldComponent } from '../celldisabledtextfield/celldisabledtextfield.component';
import { CelldisabledusedlimitComponent } from '../celldisabledusedlimit/celldisabledusedlimit.component';
import { UsermanagementService } from '../services/usermanagement.service';
import { CellcurrentlimittextfeildComponent } from '../cellcurrentlimittextfeild/cellcurrentlimittextfeild.component';

@Component({
  selector: 'app-updatelimit',
  templateUrl: './updatelimit.component.html',
  styleUrls: ['./updatelimit.component.css']
})
export class UpdatelimitComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  ClientcolumnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  gridApi: any;
  gridColumnApi: any;
  adminList: any;
  superMasterList: any;
  masterList: any;
  agentList: any;
  summaryData: any;
  userList: any;
  userType: string;
  updatelimitresp: any;

  constructor(private usermanagement:UsermanagementService) { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', minWidth: 50,lockPosition:true,suppressNavigable:true},
      {headerName: 'Agent Name', field: 'clientName', sortable: true, minWidth: 100,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match Commission', field: 'matchComm', sortable: true, minWidth: 100,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledtextfieldComponent},
      {headerName: 'Session Commission', field: 'sessionComm', sortable: true, minWidth: 100,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledtextfieldComponent},
      {headerName: 'Fix Limit', field: 'fixLimit', sortable: true, minWidth: 125,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelltextfieldComponent},
      {headerName: 'Used Limit', field: 'usedLimit', sortable: true, minWidth: 125,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledusedlimitComponent},
      {headerName: 'Actions', field: '', sortable: true, minWidth: 200,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 
    this.ClientcolumnDefs = [
      {headerName: 'ID', field: 'id', minWidth: 50,lockPosition:true,suppressNavigable:true},
      {headerName: 'Client Name', field: 'clientName', sortable: true, minWidth: 100,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match Commission', field: 'matchComm', sortable: true, minWidth: 100,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledtextfieldComponent},
      {headerName: 'Session Commission', field: 'sessionComm', sortable: true, minWidth: 100,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledtextfieldComponent},
      {headerName: 'Fix Limit', field: 'fixLimit', sortable: true, minWidth: 125,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelltextfieldComponent},
      {headerName: 'Current Limit', field: 'currentLimit', sortable: true, minWidth: 125,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CellcurrentlimittextfeildComponent},
      {headerName: 'Used Limit', field: 'usedLimit', sortable: true, minWidth: 125,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledusedlimitComponent},
      {headerName: 'Actions', field: '', sortable: true, minWidth: 200,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">No Rows To Display</span>";

    // this.gridOptions.paginationPageSize=10;
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

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter_company') as HTMLInputElement).value);
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-supermaster') as HTMLInputElement).value);
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-master') as HTMLInputElement).value);
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-superagent') as HTMLInputElement).value);
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-agent') as HTMLInputElement).value);
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-client') as HTMLInputElement).value);
  }

  ngOnInit() {
    this.userType=this.usermanagement.getUserType();
    this.usermanagement.GetCommNLimits().subscribe(resp=>{
      // console.log(resp) 
      this.updatelimitresp=resp;
      this.adminList=resp.adminList;
      this.superMasterList=resp.superMasterList;
      this.masterList=resp.masterList;
      this.agentList=resp.agentList;
      this.summaryData=resp.summaryData;
      this.userList=resp.userList;
    })
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // this.gridApi.showLoadingOverlay();
  }

}
