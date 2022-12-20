import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionType } from 'src/app/shared/constants/enums/common/action/action.enum';

// Enums
import { TableEventType } from 'src/app/shared/constants/enums/controls/table/table-event-type.enum';

// Interfaces
import { TableColumn, TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';

@Component({
  selector: '[appTableBody]',
  templateUrl: './table-body.component.html',
  styleUrls: ['./table-body.component.scss']
})
export class TableBodyComponent implements OnInit {
  /**
    * External inputs
    */
  @Input() columns: TableColumn[];
  @Input() frozenColumns: TableColumn[];
  @Input() options: TableConfig;

  @Input() expanded: boolean;
  @Input() rowData: any;
  @Input() rowIndex: number;

  /**
   * External templates inputs
   */
  @Input() itemTemplate: any;

  @Input() bodyTemplate: any;

  /**
  * External outputs
  */
  @Output() tableComponentCallback = new EventEmitter<any>();
  defaultImage = './assets/media/placeholder/lazyImageLoad.png';
  bucketAwsUrl = '';

  ngOnInit(): void {
  }

  buttonCallback(event) {
    this.tableComponentCallback.emit({ type: TableEventType.ACTION, action: event.action, data: event, rowData: this.rowData, rowIndex: this.rowIndex, expanded: this.expanded });
  }

  switchCallback(event) {
    this.tableComponentCallback.emit({ type: TableEventType.ACTION, action: event.action, data: event, rowData: this.rowData, rowIndex: this.rowIndex, expanded: this.expanded });
  }

  inviteButtonCallback(event) {
    this.tableComponentCallback.emit({ type: TableEventType.ACTION, action: ActionType.INVITE, data: event, rowData: this.rowData, rowIndex: this.rowIndex, expanded: this.expanded });
  }

  nameCallback(event) {
    this.tableComponentCallback.emit({ type: TableEventType.ACTION, action: ActionType.PREV, data: event, rowData: this.rowData, rowIndex: this.rowIndex, expanded: this.expanded })
  }
}
