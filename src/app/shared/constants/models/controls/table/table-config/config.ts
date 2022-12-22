import { ColumFilterType, ColumnDisplayType } from "src/app/shared/constants/enums/controls/table";
import { DisplayOption, ImageOption, StyleOption, TableBulkOption, TableColumn, TableConfig, TableOption } from ".";
import { ButtonConfig } from "../../button/button-config";
import { ButtonBaseConfig } from "../../button/button-config/config";
import { FieldOption, Option } from "../../form/form-field-config";
import { BasicField, CustomizeOptions } from "../../form/form-field-config/config";

export interface TableBaseConfig {
  type: 'lazy' | 'local' | undefined;

  loadOnInit?: boolean;
  dataKey?: string,
  columns: ColumnConfig[];

  advanceFilter?: boolean,

  // style
  styleOptions?: StyleOption;

  // display
  displayOptions?: DisplayOption;

  tableOptions?: TableOption;
  bulkOptions?: TableBulkOption;
  actionButtonType?: 'approve | reject';
  actionButton1Config?: ButtonBaseConfig;
  actionButton2Config?: ButtonBaseConfig;
  actionButton3Config?: ButtonBaseConfig;
  actionButtons?: ButtonConfig[],
  actionWidth?: string;
  actions?: boolean;
  edit?: boolean;
  editConfig?: ButtonBaseConfig;
  delete?: boolean;
  deleteConfig?: ButtonBaseConfig;
  view?: boolean;
  clone?: boolean;
  extend?: boolean;
  device?: boolean;
  credit?: boolean;
  message?: boolean;
  viewConfig?: ButtonBaseConfig;
  cloneConfig?: ButtonBaseConfig;
  extendConfig?: ButtonBaseConfig;
  deviseConfig?: ButtonBaseConfig;
  creditConfig?: ButtonBaseConfig;
  messageConfig?: ButtonBaseConfig;
  add?: boolean;
  addConfig?: ButtonBaseConfig;

  managePermission?: string | string[];
  viewPermission?: string | string[];
  checkbox?: boolean;
  checkboxVisibleExpr?: (data) => {};
  checkboxDisableExpr?: (data) => {};
  tableConfig?: TableConfig;
  layoutDisable?: boolean;
}

export interface ColumnConfig {
  field?: string;
  field2?: string;
  header?: string;

  type?: 'number' | 'float' | 'image' | 'images' | 'boolean' | 'user-with-image' | 'user-invite' | 'status' | 'users' | 'date' | 'dateoptional' | 'date-time' | 'date-range' | 'date-time-range' | 'link' | 'HTML' | 'progress' | 'switch' | 'custom' | undefined;

  displayType?: ColumnDisplayType;
  clickable?: boolean;

  sortableDisable?: boolean;
  toogleDisable?: boolean;
  globalFilterDisable?: boolean;
  exportDisable?: boolean;

  show?: (data: any) => {},
  permission?: string;
  prepareColumn?: (data) => {},

  imageOptions?: ImageOption;

  blank?: string;

  visible?: boolean;
  hidden?: boolean;

  columnConfig?: TableColumn;

  width?: string;
  minWidth?: string;

  filterDisable?: boolean;
  onlyFilter?: boolean;

  // filter
  filterType?: ColumFilterType;
  filterTypes?: Option[];

  filterField?: BasicField,
  filterOptions?: CustomizeOptions,
  filterOthers?: FieldOption
}