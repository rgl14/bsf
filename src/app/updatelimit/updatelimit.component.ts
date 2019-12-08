import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { CelltextfieldComponent } from '../celltextfield/celltextfield.component';
import { CelldisabledtextfieldComponent } from '../celldisabledtextfield/celldisabledtextfield.component';
import { CelldisabledusedlimitComponent } from '../celldisabledusedlimit/celldisabledusedlimit.component';

@Component({
  selector: 'app-updatelimit',
  templateUrl: './updatelimit.component.html',
  styleUrls: ['./updatelimit.component.css']
})
export class UpdatelimitComponent implements OnInit {

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
      {headerName: 'Client Name', field: 'clientname', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Match Commission', field: 'Mcomm', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledtextfieldComponent},
      {headerName: 'Session Commission', field: 'scomm', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledtextfieldComponent},
      {headerName: 'Fix Limit', field: 'fixlimit', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelltextfieldComponent},
      {headerName: 'Used Limit', field: 'usedlimit', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CelldisabledusedlimitComponent},
      {headerName: 'Actions', field: '', sortable: true, width: 350,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      {clientname:'STTT01',Mcomm:'2',scomm:'2',fixlimit:'1000000.00',usedlimit:'5000.00',id: '1' },
      {clientname:'STTT02',Mcomm:'2',scomm:'3',fixlimit:'2000000.00',usedlimit:'7000.00',id: '2' },
      {clientname:'STTT03',Mcomm:'2',scomm:'2',fixlimit:'5000000.00',usedlimit:'10000.00',id: '3' },
      {clientname:'STTT04',Mcomm:'2',scomm:'1',fixlimit:'1500000.00',usedlimit:'12000.00',id: '4' },
      {clientname:'STTT05',Mcomm:'2',scomm:'2',fixlimit:'1400000.00',usedlimit:'15000.00',id: '5' },
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
