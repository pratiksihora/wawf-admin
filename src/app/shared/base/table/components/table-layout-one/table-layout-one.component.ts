import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableExportService } from 'src/app/shared/_core/services/table/table-export.service';

// Enums
import { TableEventType } from 'src/app/shared/constants/enums/controls/table/table-event-type.enum';
import { ActionType } from 'src/app/shared/constants/enums/common/action/action.enum';

// Interfaces
import { ButtonConfig } from 'src/app/shared/constants/models/controls/button/button-config';
import { TableColumn, TableConfig } from 'src/app/shared/constants/models/controls/table/table-config';

// Utils
import { ObjectUtils } from 'src/app/libraries/prime/utils';
import { ButtonUtil } from 'src/app/shared/_core/utils/button';


@Component({
  selector: 'app-table-layout-one',
  templateUrl: './table-layout-one.component.html',
  styleUrls: ['./table-layout-one.component.scss']
})
export class TableLayoutOneComponent {
  /**
  * External inputs
  */
  @Input() options: TableConfig;
  @Input() layoutType: string;
  @Input() rows;
  @Input() columns: TableColumn[];
  @Input() selection: any;
  @Input() dt;

  /**
 * External outputs
 */
  @Output() layoutCallback = new EventEmitter<any>();

  // Enums
  tableEventTypeEnum = TableEventType;

  filterConfig: ButtonConfig = ButtonUtil.configure({ type: 'filter', size: 'sm', space: 'me-1 py-2', });
  columnConfig: ButtonConfig = ButtonUtil.configure({ type: 'settingIcon', iconOnly: true, size: 'sm', space: 'me-1' });

  selectAllConfig: ButtonConfig = ButtonUtil.configure({ type: 'selectAll', size: 'sm', space: 'me-1' });
  deselectAllConfig: ButtonConfig = ButtonUtil.configure({ type: 'deselectAll', size: 'sm', space: 'me-1' });
  deleteConfig: ButtonConfig = ButtonUtil.configure({ type: 'delete', size: 'sm', space: 'me-1', button: { action: ActionType.DELETE_SELECTED } });
  refreshConfig: ButtonConfig = ButtonUtil.configure({ type: 'refreshIcon', size: 'sm', space: 'me-1' });
  globalFilter: string = '';

  // prime table events
  checked: boolean;
  selectionChangeSubscription: Subscription;
  valueChangeSubscription: Subscription;
  constructor(private tableExportService: TableExportService, public cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.handleEvents();
  }

  filterChange(value) {
    this.layoutCallback.emit({ action: TableEventType.GLOBAL_FILTER, value });
  }

  buttonCallback(event) {
    if(event.action === TableEventType.REFRESH){
      this.globalFilter = '';
    }
    this.layoutCallback.emit(event);
  }

  /**
   * Emit event for export option
   */
  exportClick(event) {
    // open alert when data available
    // if (!this.rows || !this.rows.length) {
    //   return;
    // }

    if (this.options.tableOptions.lazy) {
      this.layoutCallback.emit(event);
      return;
    }

    switch (event.action) {
      case TableEventType.EXPORT_PDF:
        this.tableExportService.exportPdf(this.rows, { columns: this.columns });
        break;
      case TableEventType.EXPORT_EXCEL:
        this.tableExportService.exportExcel(this.rows, { columns: this.columns });
        break;
      case TableEventType.EXPORT_CSV:
        this.tableExportService.exportCSVFile(this.rows, null, { columns: this.columns });
        break;
      default:
        break;
    }
  }

  //#region  prime table handle event
  handleEvents() {
    this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe((adat) => {
      this.checked = this.updateCheckedState();
    });

    this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe((adat) => {
      this.checked = this.updateCheckedState();
    });
  }

  updateCheckedState() {
    this.cd.markForCheck();

    if (this.dt._selectAll !== null) {
      return this.dt._selectAll;
    }
    else {
      const data = this.dt.selectionPageOnly ? this.dt.dataToRender : (this.dt.filteredValue || this.dt.value || []);
      const val = this.dt.frozenValue ? [...this.dt.frozenValue, ...data] : data;
      const selectableVal = this.dt.rowSelectable ? val.filter((data, index) => this.dt.rowSelectable({ data, index })) : val;
      return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dt.selection) && selectableVal.every(v => this.dt.selection.some(s => this.dt.equals(v, s)));
    }
  }

  //#endregion
  ngOnDestroy() {
    if (this.selectionChangeSubscription) {
      this.selectionChangeSubscription.unsubscribe();
    }

    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
  }


}
