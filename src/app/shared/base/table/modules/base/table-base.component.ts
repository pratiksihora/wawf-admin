import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";

// External Modules
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Table } from "src/app/libraries/prime/table";
import { cloneDeep } from 'lodash';

// Components
import { TableFilterComponent } from "../../components/table-filter/table-filter.component";

// Interfaces & Enums
import { TableColumn, TableConfig } from "src/app/constants/models/controls/table/table-config";
import { TableEventType } from "src/app/constants/enums/controls/table/table-event-type.enum";

@Component({ template: '' })
export abstract class TableBaseComponent implements OnInit {
  // #region Table Options
  /**
    * External basic inputs
    */
  @Input() loading: boolean = false;
  @Input() layoutType: string = 'table';
  @Input() count = 0;

  @Input() headerTemplate: any;

  @Input() itemTemplate: any;

  @Input() bodyTemplate: any;

  @Input() summaryTemplate: any;

  @Input() frozenRowsTemplate: any;

  @Input() footerTemplate: any;

  @Input() emptyTemplate: any;

  @Input() rowExpansionTemplate: any;

  @Input() reorderItemTemplate: any;

  @Input() gridTemplate: any;

  // options
  _options: TableConfig;
  get options(): TableConfig {
    return this._options;
  }

  @Input('options')
  set options(value: TableConfig) {
    if (!value) return;
    // merge all options
    this._options = value;
    this._configureTableColumns();
  }

  _rows = [];
  @Input() set rows(value) {
    this._rows = this._prepareRows(value || []);
  }
  get rows() {
    return this._rows;
  }
  //#endregion

  /**
   * External outputs
   */
  @Output() tableCallback = new EventEmitter<any>();


  //#region internal variables
  @ViewChild('table') table: Table;
  columns: TableColumn[] = [];
  frozenColumns: TableColumn[] = [];
  frozenRows: any;

  first = 0;
  selection = [];
  globalFilter = '';
  tableEventEnum = TableEventType;
  filterValue;
  columnSetting = {
    open: false,
    columns: [],
    action: null
  }

  constructor(public modalService: NgbModal, public cdr: ChangeDetectorRef) {
    this.isRowSelectable = this.isRowSelectable.bind(this);
  }

  ngOnInit(): void {
    this._configureTableColumns();
  }

  _configureTableColumns() {
    this.columns = [...this._options?.columns?.filter(a => a.visible && !a.onlyFilter && !a.hidden)];
    this.frozenColumns = this._options.frozenColumns && [...(this._options.frozenColumns || []).filter(a => a.visible && !a.onlyFilter && !a.hidden)];
    this.cdr.detectChanges();
  }

  isRowSelectable(event) {
    return !(event.data.checkboxDisable || event.data.checkboxHide)
  }

  clearSelection(selected, key) {
    if (!selected) {
      this.selection = [];
      return;
    }
    this.selection = this.selection.filter(x => !selected.includes(x[key]));
  }

  _prepareRows(rows) {
    if (!(rows?.length && this.options?.columns)) return [];

    let data = rows.map(row => {
      if (this.options.tableOptions.checkboxVisibleExpr)
        row.checkboxHide = !this.options.tableOptions.checkboxVisibleExpr(row);
      if (this.options.tableOptions.checkboxDisableExpr)
        row.checkboxDisable = !this.options.tableOptions.checkboxDisableExpr(row);
      this.options.columns.forEach(col => {
        row[col.field] = col.prepareColumn(row);
      });
      return row;
    })
    return data;
  }

  //#region reorder or hide/show columns
  openColumnDrawer(type = null) {
    this.columnSetting = {
      columns: cloneDeep(this._options?.columns.filter(a => !a.hidden)),
      open: true,
      action: type
    }
    this.cdr.detectChanges();
  }

  columnSettingEvent(columns) {
    let hiddenColumns = this._options?.columns.filter(a => a.hidden);
    this._options.columns = [...columns, ...hiddenColumns];
    this._configureTableColumns();
    this.closeDrawer();
  }

  closeDrawer() {
    this.columnSetting.open = false;
    this.cdr.detectChanges();
  }
  //#endregion

  //#region advance filter
  advanceFilter() {
    if (this._options.advanceFilter) {
      const modalRef = this.modalService.open(TableFilterComponent, { centered: true, backdrop: 'static', scrollable: true, size: 'lg' });
      modalRef.componentInstance.filterValue = this.filterValue;
      modalRef.componentInstance.filterOptions = this._options.advanceFilterOptions;
      modalRef.componentInstance.saveEvent.subscribe(value => {
        this.filterValue = value;
        this.applyFilter(value);
      })
      modalRef.componentInstance.clearEvent.subscribe(value => {
        this.clearFilter();
      })
    }
  }

  clearFilter() {
    this._options.advanceFilterOptions.fields.forEach(a => {
      this.table.filter('', a.field, '', '');
    })
  }

  applyFilter(formValue) {
    this._options.advanceFilterOptions.fields.forEach(a => {
      if (formValue[`${a.field}_config`]?.filterType === 'date') {
        let value = formValue[`${a.field}_type`] === 'ltegte' ? formValue[`${a.field}_value1`] : formValue[`${a.field}_value`]
        this.table.filter(value, a.field, formValue[`${a.field}_type`], formValue[`${a.field}_config`]);
      } else {
        let value = formValue[`${a.field}_type`] === 'ltegte' ? { min: formValue[`${a.field}_value1`], max: formValue[`${a.field}_value2`] } : formValue[`${a.field}_value`]
        this.table.filter(value, a.field, formValue[`${a.field}_type`], formValue[`${a.field}_config`]);
      }
    })
  }
  //#endregion
}