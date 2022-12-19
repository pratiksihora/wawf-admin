// Interfaces
import moment from "moment-timezone";
import { ColumFilterType } from "src/app/shared/constants/enums/controls/table";
import {
  ActionButtonOption, ActionOption, AdvanceFilterOption, DisplayOption, ImageOption, StyleOption,
  TableBulkOption,
  TableColumn, TableConfig, TableOption
} from "src/app/shared/constants/models/controls/table/table-config";
import { ColumnConfig, TableBaseConfig } from "src/app/shared/constants/models/controls/table/table-config/config";

// Constants
import {
  BOOLEAN_SELECT_FILTERS, DATE_FILTERS, MULTI_SELECT_FILTERS,
  NUMBER_FILTERS, SINGLE_SELECT_FILTERS, STRING_FILTERS
} from "src/app/shared/constants/static-constants/controls/table/table-filter";

// Utils
import { ButtonUtil } from "../button";
import { DateUtil } from "../date";
import { InputUtil, SelectUtil, DateUtil as FormDateUtil } from "../form/field";

// default input configuration
const table: TableConfig = {
  tableOptions: {
    // default options
    responsive: true,
    responsiveLayout: 'scroll',
    rowHover: false,
    lazy: true,
    loadOnInit: false,
    dataKey: 'id',
    footerVisible: false,
    sticky: false,
    autoLayout: false,
    leftAction: false,

    // sort options
    sortable: true,
    sortField: null,
    sortOrder: 1,
    sortMode: 'single',
    customSort: false,

    // paging options
    paginator: true,
    pageLinks: 5,
    rows: 10,
    rowsPerPageOptions: [5, 10, 20, 50, 100, 500, 1000],
    showCurrentPageReport: true,
    currentPageReportTemplate: 'Showing {first} - {last} of {totalRecords}',

    // scrollable options
    scrollable: false,
    scrollHeight: 'flex',
    scrollDirection: undefined,
    fullPage: false,
    virtualScroll: false,
    virtualRowHeight: '100',
    minBufferPx: 50,
    maxBufferPx: 50,

    // resize options
    resizableColumns: false,
    columnResizeMode: 'expand',

    // redorder options
    reorderableColumns: false,
    reorderableRows: false,

    // storage options
    stateKey: null,
    stateStorage: 'local',

    // export options
    rowExpandMode: 'single',
    expandable: false,

    // header options
    globalFilterDisable: false,

    //selection
    checkbox: false,
    selectAll: null,
    selectionMode: 'multiple',
    metaKeySelection: false,

    // static column options
    checkboxResizeDisable: true,
    checkboxReorderDisable: true,
    rowExpansionReorderDisable: true,
    rowExpansionResizeDisable: true,
    rowResizeDisable: true,
    rowReorderDisable: true,

    // export options
    exportDisable: false,
    csvDisable: false,
    pdfDisable: false,
    excelDisable: false,
    exportPermission: undefined,
  },
  displayOptions: {
    action: 'COMMON.TABLE.ACTION',
    bulk: 'COMMON.TABLE.BULK',
    button: 'COMMON.TABLE.ACTION_BUTTON',
    exportName: 'COMMON.TABLE.EXPORT_FILE',
    filter: 'COMMON.TABLE.FILTER',
    switch: 'COMMON.TABLE.ACTION_SWITCH'
  },
  advanceFilter: true
}

export class TableUtil {
  //#region Configure All Tables
  /**
    * Configure Table
    */
  static configure(config: TableBaseConfig, translate?: any, permission?: any, data?: any): TableConfig {
    switch (config.type) {
      case 'lazy':
        return this.configureLazyTable(config, translate, permission, data);
      case 'local':
        return this.configureLocalTable(config, translate, permission, data);
      default:
        return null;
    }
  }
  //#endregion

  //#region Configure All Tables
  /**
  * Configure Lazy Table Option
  */
  static configureLazyTable(config: TableBaseConfig, translate?: any, permission?: any, data?: any): TableConfig {
    let columns = this.configureColumns(config, translate, permission, data);
    let advanceFilterOptions = this.configureFilterColumns(config, columns);
    return {
      tableOptions: this.configureTableOption(config, true),
      styleOptions: this.configureStyleOption(config),
      bulkOptions: this.configureTableBulkOption(config),
      actions: this.configureAction(config),
      buttons: this.configureActionButton(config),
      columns,
      advanceFilter: config.advanceFilter === undefined ? table.advanceFilter : config.advanceFilter,
      advanceFilterOptions,
      displayOptions: this.configureDisplayOption(config),
    }
  }
  /**
    * Configure Local Table Option
    */
  static configureLocalTable(config: TableBaseConfig, translate?: any, permission?: any, data?: any): TableConfig {
    let columns = this.configureColumns(config, translate, permission, data);
    let advanceFilterOptions = this.configureFilterColumns(config, columns);
    return {
      tableOptions: this.configureTableOption(config, false),
      styleOptions: this.configureStyleOption(config),
      actions: this.configureAction(config),
      buttons: this.configureActionButton(config),
      columns,
      advanceFilter: config.advanceFilter === undefined ? table.advanceFilter : config.advanceFilter,
      advanceFilterOptions,
      displayOptions: this.configureDisplayOption(config),
    }
  }
  //#endregion

  //#region Configure Table Options
  /**
   * Configure Table Option
   */
  static configureTableOption(config: TableBaseConfig, lazy?: boolean): TableOption {
    return {
      ...table.tableOptions,
      ...config.tableOptions,
      dataKey: config.dataKey,
      checkbox: config.checkbox || table.tableOptions.checkbox,
      checkboxDisableExpr: config.checkboxDisableExpr,
      checkboxVisibleExpr: config.checkboxVisibleExpr,
      lazy: lazy,
      layoutDisable: config.layoutDisable || false,
      loadOnInit: config.loadOnInit === undefined || !lazy,
    }
  }

  /**
 * Configure Table Option
 */
  static configureTableBulkOption(config: TableBaseConfig): TableBulkOption {
    return {
      ...config.bulkOptions
    }
  }

  /**
  * Configure Table Display Option
  */
  static configureDisplayOption(config: TableBaseConfig): DisplayOption {
    return {
      ...table.displayOptions,
      ...config.displayOptions
    }
  }

  /**
   * Configure Style Option
   */
  static configureStyleOption(config: TableBaseConfig): StyleOption {
    return {
      ...table.styleOptions,
      ...config.styleOptions
    }
  }

  /**
   * Configure Action
   */
  static configureAction(config: TableBaseConfig): ActionOption {
    if (config.actions === false) return;

    return {
      resizeDisable: true,
      reorderDisable: true,
      view: config.view != undefined ? config.view : false,
      clone: config.clone != undefined ? config.clone : false,
      delete: config.delete != undefined ? config.delete : true,
      edit: config.edit != undefined ? config.edit : true,
      editConfig: ButtonUtil.configure({ type: 'editIcon', size: 'sm', space: 'me-1', ...config.editConfig, permission: config.viewPermission || config.managePermission }),
      deleteConfig: ButtonUtil.configure({ type: 'deleteIcon', size: 'sm', space: 'me-1', ...config.deleteConfig, permission: config.managePermission }),
      viewConfig: ButtonUtil.configure({ type: 'viewIcon', size: 'sm', space: 'me-1', ...config.viewConfig, permission: config.viewPermission || config.managePermission }),
      cloneConfig: ButtonUtil.configure({ type: 'cloneIcon', size: 'sm', space: 'me-1', ...config.cloneConfig, permission: config.viewPermission || config.managePermission }),
      add: config.add != undefined ? config.add : true,
      addConfig: ButtonUtil.configure({ type: 'add', size: 'sm', space: 'me-1', ...config.addConfig, permission: config.managePermission }),
      minWidth: config.actionWidth || '120px',
      width: config.actionWidth || '120px',
    }
  }

  /**
   * Configure Action
   */
  static configureActionButton(config: TableBaseConfig): ActionButtonOption {
    if (!(config.actionButtonType || config.actionButtons)) return {
      resizeDisable: true,
      reorderDisable: true
    };

    if (config.actionButtons) {
      return {
        resizeDisable: true,
        reorderDisable: true, buttons: config.actionButtons
      };
    }

    switch (config.actionButtonType) {
      case 'approve | reject':
        return {
          resizeDisable: true,
          reorderDisable: true,
          buttons: [
            ButtonUtil.configure({ type: 'approve', size: 'sm', ...config.actionButton1Config, space: 'me-3', permission: config.managePermission }),
            ButtonUtil.configure({ type: 'reject', size: 'sm', ...config.actionButton2Config, permission: config.managePermission }),
          ]
        };
      default:
        return {
          resizeDisable: true,
          reorderDisable: true
        };
    }
  }
  //#endregion

  //#region Configure Column Options
  /**
    * Configure Common Column Method
    */
  static configureCommonColumn(column: ColumnConfig, translate?: any, permission?: any, data?: any): TableColumn {
    return {
      field: column.field,
      field2: column.field2,
      header: translate ? translate.instant(column.header) : column.header,
      clickable: column.clickable || false,
      sortableDisable: column.sortableDisable || false,
      toogleDisable: column.toogleDisable || false,
      globalFilterDisable: column.globalFilterDisable || false,
      blank: column.blank || '',
      visible: column.visible || true,
      filterDisable: column.filterDisable || false,
      exportDisable: column.exportDisable || false,
      onlyFilter: column.onlyFilter || false,
      hidden: this.configurePermission(column, permission, data),
      imageOptions: this.configureImageColumn(column),
      width: column.width,
      minWidth: column.minWidth,
      filterField: column.filterField,
      filterOptions: column.filterOptions,
      filterOthers: column.filterOthers,
      filterType: column.filterType || this.configureFilterType(column),
      ...column.columnConfig,
    };
  }

  /**
    * Configure Column Permission
    */
  static configurePermission(column: ColumnConfig, permission?: any, data?: any): boolean {
    if (column.hidden) return true;

    if (column.show && !column.show(data)) return true;

    if (permission && column.permission) {
      return !permission.getPermission(column.permission);
    }
    return false;
  }

  /**
   * Configure Image Viewer
   */
  static configureImageColumn(column: ColumnConfig): ImageOption {
    return column.imageOptions || {
      height: '100px', width: '100px', viewer: true
    };
  }

  /**
   * Configure Column Value Method
   */
  static configureValue(column: ColumnConfig) {
    return (data) => {
      switch (column.type) {
        case 'date':
        case 'dateoptional':
          return data ? DateUtil.tranformToDateFormat(data[column.field]) : '';
        case 'date-time':
          return data ? DateUtil.tranformToDateTimeFormat(data[column.field]) : '';
        case 'date-range':
          return data ? `${DateUtil.tranformToDateFormat(data[column.field])} - ${DateUtil.tranformToDateFormat(data[column.field2])}` : '';
        case 'date-time-range':
          return data ? `${DateUtil.tranformToDateTimeFormat(data[column.field])} - ${DateUtil.tranformToDateTimeFormat(data[column.field2])}` : '';
        case 'number':
          return data ? parseInt(data[column.field]) : '';
        case 'float':
          return data ? parseFloat(data[column.field]).toFixed(2) : '';
        default:
          return data ? data[column.field] : '';;
      }
    }
  }

  /**
   * Configure All Columns
   */
  static configureFilterColumns(config: TableBaseConfig, columns: TableColumn[]): AdvanceFilterOption {
    if (config.advanceFilter) return;

    const fields = columns.filter(a => !a.hidden && !a.filterDisable && a.filterType);

    let form: any = {};
    fields.forEach(column => {

      // configure basic input for field
      form[column.field] = InputUtil.configureInput({ key: column.field, label: column.header, withoutLabel: true, readonly: true, defaultValue: column.header, smallControl: true });

      // configure filter types;
      const filterType = this.configureFilterTypeOptions(column);
      form[`${column.field}_data_type`] = InputUtil.configureInput({ key: `${column.field}_data_type`, label: column.header, hidden: true, defaultValue: column.filterType });

      form[`${column.field}_type`] = SelectUtil.configureSelect({
        key: `${column.field}_type`, label: column.header, withoutLabel: true, defaultValue: (filterType.options && filterType.options[0].value) || undefined, smallControl: true, unClear: true
      }, null, { options: filterType.options });

      // configure filter values
      form[`${column.field}_value`] = filterType.value;
      form[`${column.field}_value1`] = filterType.value1;
      form[`${column.field}_value2`] = filterType.value2;

      form[`${column.field}_config`] = InputUtil.configureInput({ key: `${column.field}_config`, hidden: true, defaultValue: column });;
    });
    // return columns & form
    return { fields, form };
  }

  /**
   * Configure All Columns
   */
  static configureColumns(config: TableBaseConfig, translate?: any, permission?: any, data?: any): TableColumn[] {
    let columns: TableColumn[] = [];
    config.columns.forEach(column => {
      switch (column.type) {
        case 'HTML':
        case 'image':
        case 'images':
        case "number":
        case 'date':
        case 'date-time':
        case 'date-range':
        case 'date-time-range':
        case 'dateoptional':
        case "number":
        case "float":
          columns.push(this.configureBasic(column, translate, permission, data));
          break;
        case 'user-with-image':
        case 'users':
        case 'status':
        case 'link':
        case 'switch':
        case 'boolean':
          columns.push(this.configureBasic(column, translate, permission, data));
          break;
        default:
          columns.push(this.configureBasic(column, translate, permission, data));
      }
    });
    return columns
  }

  /**
    * Configure HTML Column Type
    */
  static configureBasic(column: ColumnConfig, translate?: any, permission?: any, data?: any): TableColumn {
    return {
      ...this.configureCommonColumn(column, translate, permission, data),
      displayType: column.type,
      prepareColumn: column.prepareColumn || this.configureValue(column),
    };
  }

  /**
    * Configure HTML Column Type
    */
  static configureAdvance(column: ColumnConfig, translate?: any, permission?: any, data?: any): TableColumn {
    return {
      ...this.configureCommonColumn(column, translate, permission, data),
      displayType: column.type,
      prepareColumn: column.prepareColumn,
    };
  }
  //#endregion

  /**
   * Configure Filter Type options and values
   */
  static configureFilterTypeOptions(column: TableColumn): any {
    let options;
    let value;
    let value1;
    let value2;
    switch (column.filterType) {
      case ColumFilterType.STRING:
        value = InputUtil.configureInput({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = STRING_FILTERS;
        break;
      case ColumFilterType.DATE:
        value = FormDateUtil.configureDate({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        value1 = FormDateUtil.configureDateRange({ ...column.filterField, key: `${column.field}_value1`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = DATE_FILTERS;
        break;
      case ColumFilterType.SELECT:
        value = SelectUtil.configureSelect({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = SINGLE_SELECT_FILTERS;
        break;
      case ColumFilterType.MULTI_SELECT:
        value = SelectUtil.configureMultiSelectCheckbox({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = MULTI_SELECT_FILTERS;
        break;
      case ColumFilterType.NUMBER:
        value = InputUtil.configureNumber({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        // this is for b/w
        value1 = InputUtil.configureNumber({ ...column.filterField, key: `${column.field}_value1`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        value2 = InputUtil.configureNumber({ ...column.filterField, key: `${column.field}_value2`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = NUMBER_FILTERS;
        break;
      case ColumFilterType.FLOAT:
        value = InputUtil.configureFloatInput({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        // this is for b/w
        value1 = InputUtil.configureFloatInput({ ...column.filterField, key: `${column.field}_value1`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        value2 = InputUtil.configureFloatInput({ ...column.filterField, key: `${column.field}_value2`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = NUMBER_FILTERS;
        break;
      case ColumFilterType.BOOLEAN:
        value = SelectUtil.configureSelect({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = BOOLEAN_SELECT_FILTERS;
        break;
      default:
        value = InputUtil.configureInput({ ...column.filterField, key: `${column.field}_value`, label: '', withoutLabel: true, smallControl: true }, null, column.filterOptions, column.filterOthers);
        options = STRING_FILTERS;
        break;
    }
    return { options: column.filterTypes || options, value, value1, value2 };
  }

  /**
    * Configure Filter Type options and values
    */
  static configureFilterType(columnConfig: ColumnConfig): any {
    switch (columnConfig.type) {
      case 'HTML':
        return ColumFilterType.STRING
      case 'image':
      case 'images':
        return undefined;
      case 'date':
      case 'date-time':
      case 'date-range':
      case 'date-time-range':
      case 'dateoptional':
        return ColumFilterType.DATE
      case "number":
        return ColumFilterType.NUMBER
      case "progress":
      case "float":
        return ColumFilterType.FLOAT
      case 'user-with-image':
        return ColumFilterType.STRING
      case 'users':
        return ColumFilterType.STRING
      case 'status':
      case 'link':
        return ColumFilterType.STRING
      case 'switch':
      case 'boolean':
        return ColumFilterType.BOOLEAN
      default:
        return ColumFilterType.STRING
    }
  }

  static getTablePayload(data, tableConfig: TableConfig, intialFilter: any = null) {
    const payload: any = {};
    payload.pageNumber = ((data.first / data.rows) + 1) || 1;
    payload.pageSize = data.rows || 10;

    if (data.sortField && data.sortOrder) {
      payload.sort = [{
        "field": data.sortField,
        "direction": data.sortOrder === 1 ? 'asc' : 'desc'
      }]
    }

    if (data && data.filters) {
      payload.filters = [];
      const filters = data.filters;
      Object.keys(filters).forEach(key => {
        if (key !== 'global') {
          let filterPayload: any = { field: key, value: filters[key].value, type: filters[key].config.filterType, operator: filters[key].matchMode, subType: 'string' };
          switch (filterPayload.type) {
            case ColumFilterType.DATE:
              if (filterPayload.operator === 'ltegte') {
                filterPayload.type = 'daterange';
                filterPayload.dateRangeValue = {
                  "minDate": filterPayload.value?.start,
                  "maxDate": filterPayload.value?.end
                }
              } else if (['lte', 'gte', 'eq', 'neq'].includes(filterPayload.operator)) {
                filterPayload.dateValue = filterPayload.value?.start ? this.makeDate(filterPayload.value?.start) : this.makeDate(filterPayload.value);
              }
              filterPayload.value = undefined;
              break;
            case ColumFilterType.NUMBER:
              if (filterPayload.operator === 'ltegte') {
                filterPayload.type = 'numrange';
                filterPayload.numRangeValue = {
                  "minNum": filterPayload.value?.min,
                  "maxNum": filterPayload.value?.max
                }
                filterPayload.value = undefined;
              }
              break;
            default:
              break;
          }
          filterPayload && payload.filters.push(filterPayload);
        } else if (key === 'global') {
          payload.globalFilter = filters[key].value;
          payload.globalFilterFields = tableConfig.columns.filter(a => !a.globalFilterDisable).map(a => ({ field: a.field, type: a.filterType }));
        }
      });
    }


    if (intialFilter) {
      let filter = intialFilter.filter(a => !payload.filters.find(x => x.field === a.field));
      if (filter.length) {
        filter.forEach(ft => {
          ft.value && payload.filters.push({ field: ft.field, value: ft.value, type: ft.filterType || 'string', operator: ft.operator || 'eq', subType: 'string' })
        });
      }
    }

    return payload;
  }

  static makeDate(date) {
    return moment(date).format('YYYY-MM-DDT00:00:00');
  }
}