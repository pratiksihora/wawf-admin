import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

// External Modules
import { Subscription } from "rxjs";
import { cloneDeep } from "lodash";
import { saveAs } from 'file-saver';

// Components
import { TableComponent } from "../../modules/table/table.component";

// Services
import { TableService } from "src/app/api/services/common/table/table.service";
import { TableExportService } from "src/app/shared/_core/services/table/table-export.service";

// Interfaces
import { TableApiConfig } from "src/app/shared/constants/models/controls/table/table-api";
import { TableConfig } from "src/app/shared/constants/models/controls/table/table-config";

// Enums
import { TableEventType } from "src/app/shared/constants/enums/controls/table/table-event-type.enum";

// Utils
import { TableUtil } from "src/app/shared/_core/utils/table";
import { environment } from "../../../../../../environments/environment";


/**
 * Common form store class for handle form get and submit api calls
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 30/03/2020 (Pratik Shihora <pratik@saeculumsolutions.com>) form store base class created
 */
@Component({ template: '' })
export abstract class TableApiComponent implements OnInit {

  @ViewChild('table') table: TableComponent;
  /**
   * External inputs
   */
  @Input() data;

  config: TableApiConfig;
  tableConfig: TableConfig;
  initialFilter: any;
  tableList: Array<any> = [];

  loading = false;
  count: number = 0;
  lastPayload = null;
  /**
  * Subscriptions handle on destroy
  */
  subscriptions: Subscription[] = [];
  constructor(public tableService: TableService, public activatedRoute: ActivatedRoute, public cdr: ChangeDetectorRef, public exportService: TableExportService) {
  }

  ngOnInit(): void {
  }

  prepareData() {
    if (this.data) {
      return this.data;
    }

    let payload: any = {};
    (this.config.params || []).forEach(param => {
      payload[param] = this.activatedRoute.snapshot.queryParamMap?.get(param) || this.activatedRoute.snapshot.paramMap?.get(param);
    })
    return payload;
  }

  /**
   * table callback
   */
  tableCallback(event) {
    switch (event.action) {
      // Table lazy load callback event to make api call
      case TableEventType.LAZY:
        const payload = TableUtil.getTablePayload(event.data, this.tableConfig, this.initialFilter);
        this.tableApiCall(payload);
        break;
      case TableEventType.ADD:
        this.onAddEdit();
        break;
      case TableEventType.EDIT:
        this.onAddEdit(event);
        break;
      case TableEventType.EXTEND:
        this.tableActionExtend(event);
        break;
      case TableEventType.DEVISE:
        this.tableActionDevice(event);
        break;
      case TableEventType.CREDIT:
        this.tableActionCredit(event);
        break;
      case TableEventType.EDITOR:
        this.tableActionEditor(event);
        break;
      case TableEventType.DELETE:
        this.tableDeleteApiCall(event.rowData, event.action);
        break;
      case TableEventType.DELETE_SELECTED:
        this.tableDeleteApiCall(event.rowData, event.action);
        break;
      case TableEventType.DOWNLOAD:
        this.tableDownloadCall(event.rowData);
        break;
      case TableEventType.MOVE:
        this.tableCustomEventCall(event);
        break;
      case TableEventType.EXPORT_PDF:
      case TableEventType.EXPORT_EXCEL:
      case TableEventType.EXPORT_CSV:
        this.tableExportApiCall(event);
        break;
      case TableEventType.URL:
        this.tableActionURL(event);
        break;
      case TableEventType.CLONE:
        this.tableActionClone(event);
        break;
      case TableEventType.STATISTICS:
        this.tableActionStatistic(event);
        break;
      case TableEventType.QR:
        this.tableActionQR(event);
        break;
      case TableEventType.VIEW:
        this.tableActionView(event);
        break;
      case TableEventType.INVITE:
        this.tableActionInvite(event);
        break;
      case TableEventType.PREV:
        this.tableActionView(event);
        break;
      case TableEventType.APPROVE:
        this.tableActionApproveReject(event);
        break;
      case TableEventType.REFRESH:
        this.tableLocalRefresh(event);
        break;
      case TableEventType.REJECT:
        this.tableActionApproveReject(event);
        break;
      case TableEventType.RESEND:
        this.tableActionResend(event);
        break;
      default:
        break;
    }
  }

  tableActionQR(event) {
    return;
  }

  tableActionResend(event) {
    return;
  }

  tableActionApproveReject(event) {
    return
  }

  tableActionView(event) {
    return;
  }

  tableActionEditor(event) {

  }

  tableActionURL(event) {
    return;
  }

  tableLocalRefresh(event) {
    return;
  }

  tableActionClone(event) {
    return;
  }

  tableActionStatistic(event) {
    return;
  }

  tableActionInvite(event) {
    return;
  }

  onAddEdit(value: any = null) {
  }

  tableActionExtend(event) {
    return;
  }

  tableActionDevice(event) {
    return;
  }

  tableActionCredit(event) {
    return;
  }

  //#region lazy and local table api call handle
  prepareTablePayload() {
    if (this.data) {
      return this.modifyPayloadBeforeTableCall(this.data);
    }
    let payload: any = {}
    this.config.params?.forEach(param => {
      payload[param] = this.activatedRoute.snapshot.queryParamMap?.get(param) || this.activatedRoute.snapshot.paramMap?.get(param);
    })
    return this.modifyPayloadBeforeTableCall(payload);
  }

  modifyPayloadBeforeTableCall(data: any) {
    return data;
  }

  tableConfigForApiCall() {
    return this.config.pagging || this.config.all;
  }

  tableApiCall(data) {
    this.loading = true;
    const payload = { ...this.prepareTablePayload(), ...data };
    this.lastPayload = payload;
    this.subscriptions.push(this.tableService.tableCommon(this.tableConfigForApiCall(), payload).subscribe((response: any) => {
      this.tableDataCallback(response);
    }, err => {
      this.tableDataCallback(err, true);
    }));
  }

  tableCustomEventCall(data) {
    return data;
  }

  prepareDataForTable(data: any) {
    return data;
  }

  setDataToTable(response) {
    this.tableList = cloneDeep(response.data.records);
    this.count = response.data.count;
  }

  tableDataCallback = (response: any, error: boolean = false) => {
    if (!error && response.status === 200) {
      const list = this.prepareDataForTable(response);
      this.setDataToTable(list);
      this.tableDataLoaded(response);
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.tableError(response);
    this.loading = false;
    this.cdr.detectChanges();
    return;
  }

  tableDataLoaded(values = null) {
    return values;
  }

  tableError(values = null) {
  }
  //#endregion


  //#region export table api call handle
  prepareTableExportPayload() {
    if (this.data) {
      return this.modifyPayloadBeforeTableExportCall(this.data);
    }
    let payload: any = {}
    this.config.params.forEach(param => {
      payload[param] = this.activatedRoute.snapshot.queryParamMap?.get(param) || this.activatedRoute.snapshot.paramMap?.get(param);
    })
    return this.modifyPayloadBeforeTableExportCall(payload);
  }

  modifyPayloadBeforeTableExportCall(data: any) {
    return data;
  }

  tableConfigForExportApiCall() {
    return this.config.export;
  }

  tableExportApiCall(event) {
    this.loading = true;
    const payload = this.lastPayload
    this.subscriptions.push(this.tableService.tableCommon(this.tableConfigForExportApiCall(), payload).subscribe((response: any) => {
      this.tableExportDataCallback(response, false, event);
    }, err => {
      this.tableExportDataCallback(err, true);
    }));
  }

  prepareExportDataForTable(data: any) {
    return this._prepareRows(data);
  }

  setExportDataToTable(data) {
    return cloneDeep(data);
  }

  tableExportDataCallback = (response: any, error: boolean = false, event = null) => {
    if (!error && response.succeeded) {
      const list = this.prepareExportDataForTable(response.data);
      const exportData = this.setExportDataToTable(list);
      switch (event.action) {
        case TableEventType.EXPORT_PDF:
          this.exportService.exportPdf(exportData, { columns: this.tableConfig.columns });
          break;
        case TableEventType.EXPORT_EXCEL:
          this.exportService.exportExcel(exportData, { columns: this.tableConfig.columns });
          break;
        case TableEventType.EXPORT_CSV:
          this.exportService.exportCSVFile(exportData, null, { columns: this.tableConfig.columns });
          break;
        default:
          break;
      }
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.tableError(response);
    this.loading = false;
    this.cdr.detectChanges();
    return;
  }

  _prepareRows(rows) {
    if (!(rows?.length && this.tableConfig.columns)) return [];

    return rows.map(row => {
      this.tableConfig.columns.forEach(col => {
        row[col.field] = col.prepareColumn(row);
      });
      return row;
    });
  }
  //#endregion

  //#region delete table api call handle
  preparePayloadForDelete(data, action) {
    let payload: any = this.prepareTablePayload();
    const extraData = cloneDeep(data);

    return this.modifyPayloadBeforeDeleteCall({ ...payload, ...extraData }, action);
  }

  modifyPayloadBeforeDeleteCall(data: any, action: any) {
    return data;
  }

  tableConfigForDeleteApiCall() {
    return this.config.delete;
  }

  tableDeleteApiCall(data = null, action = null) {
    this.loading = true;
    let payload = this.preparePayloadForDelete(data, action);
    this.subscriptions.push(this.tableService.tableCommon(this.tableConfigForDeleteApiCall(), payload).subscribe({
      next: (response: any) => {
        this.tableDeleteCallback(response);
      }, error: err => {
        this.tableDeleteCallback(err, true);
      }
    }));
  }

  async tableDownloadCall(data = null) {
    let payload = this.prepareTablePayload();
    const extraData = cloneDeep(data);
    const modifiedPayload = this.modifyPayloadBeforeDownloadCall({ ...payload, ...extraData });
    try {
      await fetch((data.gl_filepath))
        .then(res => res.blob())
        .then((blob) => {
          saveAs(blob, (data.gl_name.name + data.gl_type));
        })
    } catch (e) {
      throw e;
    }

  }

  modifyPayloadBeforeDownloadCall(data: any) {
    return data;
  }

  tableDeleteCallback = (response: any, error: boolean = false) => {
    if (!error && response.succeeded) {
      this.setDataAfterDelete(response);
      this.dataDeleted(response);
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.tableDeleteError(response);
    this.loading = false;
    this.cdr.detectChanges();
    return;
  }

  setDataAfterDelete(data) {
    this.tableApiCall(this.lastPayload);
    this.table?.table?.toggleRowsWithCheckbox(null, false);
  }

  dataDeleted(values = null) {
    return values;
  }

  tableDeleteError(values = null) {
  }
  //#endregion
}