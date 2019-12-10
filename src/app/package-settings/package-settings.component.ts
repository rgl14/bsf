import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CustomcellbuttonsComponent } from '../customcellbuttons/customcellbuttons.component';
import { SportDataService } from '../services/sport-data.service';

@Component({
  selector: 'app-package-settings',
  templateUrl: './package-settings.component.html',
  styleUrls: ['./package-settings.component.css']
})
export class PackageSettingsComponent implements OnInit {

  gridOptions: GridOptions;
  columnDefs: any
  paginationPageSize: any;
  paginationSetPageSize;
  paginationNumberFormatter: any;
  rowData = [];

  constructor(private sportService: SportDataService) {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      { headerName: 'ID', field: 'id', width: 100, sortable: true, lockPosition: true, suppressNavigable: true },
      { headerName: 'Package Name', field: 'label', sortable: true, width: 600 },
      { headerName: 'Edit', field: '', sortable: true, width: 600, cellRendererFramework: CustomcellbuttonsComponent, cellStyle: { color: '#0084e7', 'font-weight': 'bolder' } },
    ];

    this.gridOptions.paginationPageSize = 10;
    this.gridOptions.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    this.gridOptions.getRowHeight = function (params: any) {
      return 45;
    }
    // all rows assigned CSS class 'my-green-class'
    this.gridOptions.rowClass = 'my-green-class';
    this.gridOptions.getRowClass = function (params: any) {
      if (params.node.rowIndex % 2 === 0) {
        return 'my-shaded-effect';
      }
    }
  }

  onPageSizeChanged(newPageSize: any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }

  ngOnInit() {
    this.GetMktSettingsPckgList();
  }

  GetMktSettingsPckgList() {
    this.sportService.GetMktSettingsPckgList().subscribe(data => {
      this.rowData = data.data;
    }, err => {
      console.log(err);
    })
  }

}
