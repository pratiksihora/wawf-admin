import { Component, Input, OnInit } from '@angular/core';

// Interfaces
import { TableColumn, TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';

// Constansts
import { DefaultTableConstant } from 'src/app/shared/constants/enums/core/default-table.enum';
import { NgxPermissionsService } from 'ngx-permissions';

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
    private ngxPermissionService: NgxPermissionsService
  ) { }

  ngOnInit(): void {
    if (this.options?.actions?.deleteConfig?.permission) {
      this.actionPermission = this.options?.actions?.deleteConfig?.permission.some(per => this.ngxPermissionService.getPermission(per));
    }
  }
}
