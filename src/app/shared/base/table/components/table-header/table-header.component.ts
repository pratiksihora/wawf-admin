import { Component, Input, OnInit } from '@angular/core';

// Interfaces
import { TableColumn, TableConfig } from 'src/app/constants/models/controls/table/table-config';

// Constansts
import { DefaultTableConstant } from 'src/app/constants/enums/core/default-table.enum';


@Component({
  selector: '[appTableHeader]',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent implements OnInit {

  /**
   * External inputs
   */
  @Input() columns: TableColumn[];
  @Input() frozenColumns: TableColumn[];
  @Input() options: TableConfig;
  @Input() table;

  // constants
  public tableEnum = DefaultTableConstant;
  actionPermission = true;

  constructor(
  ) { }

  ngOnInit(): void {
  }
}
