import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
// import { MatTableDataSource,MatSort,MatPaginator } from '@angular/material';

@Component({
  selector: 'app-coinhistory',
  templateUrl: './coinhistory.component.html',
  styleUrls: ['./coinhistory.component.css']
})
export class CoinhistoryComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  gridApi:any;
  gridColumnApi:any;
  paginationSetPageSize:number;
  paginationNumberFormatter:any;
  rowData=[];
  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ChanelogID', field: 'chanelogID', sortable: true, width: 200,lockPosition:true,suppressNavigable:true},
      {headerName: 'Discription', field: 'discription', sortable: true, width: 500,cellStyle: {color: '#0084e7'}},
      {headerName: 'Coins', field: 'coins', sortable: true, width: 150,cellStyle: {color: 'green'}},
      {headerName: 'Match Commission', field: 'matchcommission', sortable: true, width: 150},
      {headerName: 'Session Commission', field: 'sessioncommission', sortable: true, width: 180},
      {headerName: 'Created At', field: 'createdAt', sortable: true, width: 270},
    ]; 
    this.gridOptions.rowData = [
      {chanelogID : '8303813',discription : 'Coins after match declaration :',coins : '20000.00',matchcommission : '0.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
      {chanelogID : '8303814',discription : 'Coins after match declaration :',coins : '90000.00',matchcommission : '1.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
      {chanelogID : '8303815',discription : 'Coins after match declaration :',coins : '4000.00',matchcommission : '0.0',sessioncommission : '2.0',createdAt : 'Sep 23 2019, 7:55 AM'},
      {chanelogID : '8303816',discription : 'Coins after match declaration :',coins : '2000.00',matchcommission : '0.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
    ];
    this.gridOptions.paginationPageSize=50;
    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }

  onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  
  //   listData: MatTableDataSource<any>;
  //   displayedColumns: string[] = ['chanelogID', 'discription', 'coins', 'matchcommission', 'sessioncommission','createdAt'];
  //   @ViewChild(MatSort,{static: true}) sort: MatSort;
  //   @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  //   searchKey: string;

  //  list=[
  //    {chanelogID : '8303813',discription : 'Coins after match declaration :',coins : '20000.0',matchcommission : '0.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //    {chanelogID : '8303814',discription : 'Coins after match declaration :',coins : '90000.0',matchcommission : '1.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //    {chanelogID : '8303815',discription : 'Coins after match declaration :',coins : '4000.0',matchcommission : '0.0',sessioncommission : '2.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //    {chanelogID : '8303816',discription : 'Coins after match declaration :',coins : '2000.0',matchcommission : '0.0',sessioncommission : '0.0',createdAt : 'Sep 23 2019, 7:55 AM'},
  //   ]

  ngOnInit() {
    // this.listData=new MatTableDataSource(this.list);
    // this.listData.sort = this.sort;
    // this.listData.paginator = this.paginator;
    //     this.listData.filterPredicate = (data, filter) => {
    //       return this.displayedColumns.some(ele => {
    //         return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
    //       });
    //     };
  }
  // onSearchClear() {
  //   this.searchKey = "";
  //   this.applyFilter();
  // }

  // applyFilter() {
  //   this.listData.filter = this.searchKey.trim().toLowerCase();
  // }

}
