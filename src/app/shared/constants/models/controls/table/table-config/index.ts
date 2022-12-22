// Enums
import { ColumFilterType } from "src/app/shared/constants/enums/controls/table";

// Interfaces
import { ApiAction } from "../../../api";
import { ButtonConfig } from "../../button/button-config";
import { FieldOption, Option } from "../../form/form-field-config";
import { BasicField, CustomizeOptions } from "../../form/form-field-config/config";

/**
 * Table configureation
 */
export interface TableConfig {
  tableOptions?: TableOption;

  // columns options
  columns?: TableColumn[];
  frozenColumns?: TableColumn[];

  // display options
  displayOptions?: DisplayOption;

  // width options
  widthOptions?: WidthOption;

  // style options
  styleOptions?: StyleOption;

  // bulk options
  bulkOptions?: TableBulkOption;

  // quickView Options
  quickViewOptions?: QuickViewOption[];

  // hotList Options
  hotListOptions?: HotListOption;

  // filter options
  advanceFilter?: boolean,
  advanceFilterOptions?: AdvanceFilterOption;

  // actions options
  actions?: ActionOption;

  // switch options
  switch?: ActionSwitchOption;

  // action button options
  buttons?: ActionButtonOption;
}

/**
 * Advance filter option for table config
 */
export interface AdvanceFilterOption {
  // pending options we can add later
  // default options
  fields?: TableColumn[];
  form: any;
}

/**
 * Filter fields for table config
 */
export interface FilterField extends ExtraColumnOption {
  // default options
  filterType?: ColumFilterType;
  filterTypes?: Option[];
  onlyFilter?: boolean;

  filterField?: BasicField,
  filterOptions?: CustomizeOptions,
  filterOthers?: FieldOption
}

/**
 * Table bulk option for table config
 */
export interface TableBulkOption {
  // default options
  updateField?: boolean;
  deleteDisable?: boolean;
  buttons?: ButtonConfig[];
  groupButtons?: ButtonConfig[]
}

/**
 * Table hot list option for table config
 */
export interface HotListOption extends APICallOption {
}

/**
 * Table api option for table config
 */
export interface APICallOption {
  // default options
  url?: string;
  api?: ApiAction;
  valueKey?: string;
  textKey?: string;
  filterExpr?: string[]
}

/**
 * Table option for table config
 */
export interface TableOption {
  // default options
  responsive?: boolean;
  responsiveLayout?: 'scroll' | 'stack';
  rowHover?: boolean;
  lazy?: boolean;
  loadOnInit?: boolean;
  dataKey?: string;
  nameKey?: string;
  footerVisible?: boolean;
  sticky?: boolean;
  autoLayout?: boolean;
  leftAction?: boolean;
  layoutDisable?: boolean;

  // sort options
  sortable?: boolean,
  sortField?: string;
  sortOrder?: number;
  sortMode?: 'single' | 'multiple' | undefined;
  customSort?: boolean;
  multiSortMeta?: any[];

  // paging options
  paginator?: boolean;
  pageLinks?: number;
  rows?: number;
  rowsPerPageOptions?: any[];
  showCurrentPageReport?: boolean;
  currentPageReportTemplate?: string;

  // scrollable options
  scrollable?: boolean;
  scrollHeight?: string;
  scrollDirection?: string;
  fullPage?: boolean;
  virtualScroll?: boolean;
  virtualRowHeight?: string;
  minBufferPx?: number;
  maxBufferPx?: number;

  // resize options
  resizableColumns?: boolean;
  columnResizeMode?: 'expand' | 'fit' | 'none' | undefined;

  // redorder options
  reorderableColumns?: boolean;
  reorderableRows?: boolean;

  // storage options
  stateKey?: string;
  stateStorage?: 'local' | 'session' | undefined

  // export options
  rowExpandMode?: 'single' | 'multiple' | undefined;
  expandable?: boolean;

  // header options
  globalFilterDisable?: boolean;

  //selection
  checkbox?: boolean;
  checkboxDisableExpr?: (data) => {},
  checkboxVisibleExpr?: (data) => {},
  selectAll?: boolean;
  selectionMode?: 'single' | 'multiple' | undefined;
  metaKeySelection?: boolean;

  // static column options
  checkboxResizeDisable?: boolean;
  checkboxReorderDisable?: boolean;
  radioResizeDisable?: boolean;
  radioReorderDisable?: boolean;
  rowExpansionReorderDisable?: boolean;
  rowExpansionResizeDisable?: boolean;
  rowResizeDisable?: boolean;
  rowReorderDisable?: boolean;

  // export options
  exportDisable?: boolean;
  csvDisable?: boolean;
  pdfDisable?: boolean;
  excelDisable?: boolean;
  exportPermission?: string;
  filterDisable?: boolean;
  refreshDisable?: boolean;
  columnToggleDisable?: boolean;
}

/**
 * QuickView option for table config
 */
export interface QuickViewOption {
  name?: string;
  icon?: string;
  permission?: string;
  type?: 'all' | 'own' | 'archived' | 'own archived' | 'notinhotlist' | undefined;
}

/**
 * Style option for table config
 */
export interface StyleOption {
  style?: any;
  styleClass?: string;
  tableStyle?: any;
  tableStyleClass?: string;
}

/**
 * Display option for table config for translate
 */
export interface DisplayOption {
  exportName?: any;
  action?: string;
  button?: string;
  switch?: string;
  header?: string;
  reorder?: string;
  bulk?: string;
  filter?: string;
}

/**
 * Table column setting for table config
 */
export interface TableColumn extends FilterField {
  field?: string;
  field2?: string;
  header?: string;
  displayType?: 'number' | 'float' | 'image' | 'images' | 'boolean' | 'user-with-image' | 'user-invite' | 'status' | 'users' | 'date' | 'dateoptional' | 'date-time' | 'date-range' | 'date-time-range' | 'link' | 'HTML' | 'progress' | 'switch' | 'custom' | undefined;
  clickable?: boolean;

  sortableDisable?: boolean;
  toogleDisable?: boolean;
  globalFilterDisable?: boolean;
  filterDisable?: boolean;
  exportDisable?: boolean;

  show?: any,
  permission?: string;
  prepareColumn?: any,

  imageOptions?: ImageOption;

  blank?: string;

  visible?: boolean;
  hidden?: boolean;
}

/**
 * Extra table column setting for table config
 */
export interface ExtraColumnOption extends WidthOption {
  reorderDisable?: boolean;
  resizeDisable?: boolean;
}

/**
 * Width setting for table config
 */
export interface WidthOption {
  width?: string;
  minWidth?: string;
  frozenWidth?: string;
}

/**
 * Image Option setting for table config
 */
export interface ImageOption {
  width?: string;
  height?: string;
  viewer?: boolean;
}

/**
 * Table action option for table config
 */
export interface ActionOption extends ExtraColumnOption {
  add?: boolean;
  edit?: boolean;
  view?: boolean;
  clone?: boolean;
  extend?: boolean;
  device?: boolean;
  credit?: boolean;
  delete?: boolean;
  message?: boolean;
  addConfig?: ButtonConfig;
  editConfig?: ButtonConfig;
  viewConfig?: ButtonConfig;
  cloneConfig?: ButtonConfig;
  extendConfig?: ButtonConfig;
  deviseConfig?: ButtonConfig;
  creditConfig?: ButtonConfig;
  messageConfig?: ButtonConfig;
  deleteConfig?: ButtonConfig;
}

/**
 * Action button option for table config
 */
export interface ActionButtonOption extends ExtraColumnOption {
  buttons?: ButtonConfig[]
}

/**
 * Action button option for table config
 */
export interface ActionSwitchOption extends ExtraColumnOption {
  switch?: TableColumn
}