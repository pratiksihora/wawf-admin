import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// External Modules 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Components
import { TableBaseComponent } from '../base/table-base.component';

// Enums
import { TableEventType } from 'src/app/constants/enums/controls/table/table-event-type.enum';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent extends TableBaseComponent implements OnInit {

  colSpan;
  constructor(public modalService: NgbModal, public cdr: ChangeDetectorRef) {
    super(modalService, cdr);
  }

  tableComponentCallback(data: any) {
    this.tableCallback.emit(data);
  }

  layoutCallback(data) {
    switch (data.action) {
      case TableEventType.FILTER:
        this.advanceFilter();
        break;
      case TableEventType.REFRESH:
        if(!this.table.lazy) {
          this.tableComponentCallback(data);
        }
        this.table.reset();
        break;
      case TableEventType.SETTING:
        this.openColumnDrawer('REORDER');
        break;
      case TableEventType.GLOBAL_FILTER:
        this.table.filterGlobal(data.value, 'contains');
        break;
      case TableEventType.SELECT_ALL:
        this.table.toggleRowsWithCheckbox(data.event, true);
        break;
      case TableEventType.UNSELECT_ALL:
        this.table.toggleRowsWithCheckbox(data.event, false);
        break;
      default:
        this.tableComponentCallback(data);
        break;
    }
  }

  getColumnSpan() {
    let length = this.columns.length;

    if (this.options?.tableOptions?.checkbox) ++length;
    if (this.options?.bulkOptions?.buttons?.length) ++length;
    if (this.options?.actions?.add || this.options?.actions?.view || this.options?.actions?.delete) ++length;
    return length;
  }
}
