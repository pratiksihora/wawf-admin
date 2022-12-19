// Enums
import { Placement } from "src/app/shared/constants/enums/common/placement/placement.enum";
import { CheckBoxRadioLayoutType } from "src/app/shared/constants/enums/controls/form/form-checkbox-radio-layout-type.enum";
import { ComponentType } from "src/app/shared/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";
import { InputControlType } from "src/app/shared/constants/enums/controls/form/form-input-control-type.enum";
import { LayoutType } from "src/app/shared/constants/enums/controls/form/form-layout-type.enum";

// Interfaces
import { ApiAction } from "../../../api";
////////////////////////////////////////
//            INTERFACES              //
////////////////////////////////////////

//#region Form Interface Models
/**
 * Form interface for all fields
 */
export interface FormGlobalConfig {
  // common
  view?: boolean;
  clone?: boolean;
  disabled?: boolean,
  templateOptions?: TemplateOption;
  classNames?: ClassName;
}

export interface Field extends FieldOption {
  // common
  key: string;
  subControlType?: string;
  type: ControlType;
}
/**
 * Form Field interface for fields
 */
export interface FieldOption {
  // common
  key?: string;
  type?: ControlType;
  component?: ComponentType;
  fieldGroups?: Field[];
  hidden?: boolean;
  readonly?: boolean;
  disabled?: boolean,
  defaultValue?: any;
  firstSelect?: boolean;
  displayOptions?: DisplayOption;
  templateOptions?: TemplateOption;
  dataType?: ControlDataType;
  validations?: Validation;
  classNames?: ClassName;
  tooltipOptions?: TooltipOptions;
  permission?: Permission;
  expression?: Expression;
  resetDependentFields?: string[];
  options?: string[] | Option[] | any;
  prefix?: string;
  api?: ApiAction;

  // its mostly use for modify payload, options, request and response data
  prepareOptions?: any;
  prepareApiPayload?: any;
  prepareIncoming?: any;
  prepareOutgoing?: any;

  // input
  iconOptions?: IconOption;
  subType?: InputControlType;

  // textarea
  rows?: number;

  // date picker options
  datePickerOptions?: DatePickerOption;

  // color picker options
  colorOptions?: ColorOption;

  // template control
  template?: string | any;

  // file Options
  fileOptions?: FileOption;

  // select Options
  selectOptions?: SelectOption;

  // range Options
  rangeOptions?: RangeOption;

  // form-array Options
  formArrayOptions?: FormArrayOption;
}

/**
 * Display option interface for field config
 */
export interface DisplayOption {
  label?: string | any;
  labelHTML?: string | any;
  rightLabel?: string | any;
  placeholder?: string | any;
  labelInfo?: string | any;
  tooltip?: string | any;
  hint?: string | any;
  notFound?: string | any; // form-array + select can use
  loading?: string | any;
  button?: string | any;

  // Switch, radio, checkbox
  label2?: string | any;

  // file & form array
  add?: string | any;
  change?: string | any;
  remove?: string | any;

  // select
  search?: string | any;
  clear?: string | any;
}

/**
 * Extra option interface for field config
 */
export interface TemplateOption {
  withoutLabel?: boolean;
  rightLabel?: boolean;
  bolderLabel?: boolean;
  smallControl?: boolean;
  largeControl?: boolean;
  solidControl?: boolean;
  roundControl?: boolean;
  outlineControl?: boolean;
  multiple?: boolean;
  rows?: number;
  layout?: LayoutType;
  optionLayout?: CheckBoxRadioLayoutType;
  inlineControl?: Boolean;
  grid?: string;

  // form-array & form-group
  preSeperator?: boolean;
  postSeperator?: boolean;

  rangeSuffix?: string;

  open?: string;

  autoUpdate?: boolean;
  unClear?: boolean;
}

/**
 * Extra Options for tooltip configuration
 */
export interface TooltipOptions {
  position?: string | any;
  append?: string | any;
}

/**
 * Icon interface for icon type and position
 */
export interface IconOption {
  leftAddonIcon?: Icon;
  rightAddonIcon?: Icon;
  leftInlineIcon?: Icon;
  rightInlineIcon?: Icon;
}

/**
 * Option interface for select, radio config
 */
export interface Option {
  value: number | string;
  text: string;
  icon?: string;
  svg?: string;
  className?: string;
}

/**
 * Option interface for select, radio config
 */
export interface ExpressionOption {
  key: string;
  value: string[] | boolean[];
  exist?: boolean;
  parentForm?: boolean;
}

/**
 * Icon option interface for icon config
 */
export interface Icon {
  icon?: string;
  svg?: string | any;
  text?: string;
  class?: string;
}

/**
 * Validation interface for validators and messagesF
 */
export interface Validation {
  validators?: ValidatorOption;
  messages?: ErrorMessage;
}

/**
 * Validator interface for form validation config
 */
export interface ValidatorOption {
  // basic validations
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string | RegExp;

  // checkbox validations
  minSelection?: number;
  maxSelection?: number;
  reqSelection?: boolean;

  // date validations
  minDate?: any;
  maxDate?: any;
  noFutureDate?: boolean;
  noPastDate?: boolean;
  greaterThanDateKey?: string;
  lessThanDateKey?: string;

  // number validations
  greaterThanNumberKey?: string;
  lessThanNumberKey?: string;

  // file validations
  allowedExtensions?: string[];
  maxFileSize?: number;
  minFileSize?: number;
  maxFileAllowed?: number;
  minFileAllowed?: number;

  // confirm password validations
  confirmPassword?: string;

  // custom email validations
  multiEmail?: boolean;
}

/**
 * Color option interface for field config
 */
export interface ColorOption {
  // tooltip options
  position?: Placement | any;
  colorMode?: string | any;
  presetColors?: string[] | any;
  positionOffset?: string | any;
  positionRelativeToArrow?: boolean | any;

  // buttons
  cancelHide?: boolean | any;
  okHide?: boolean | any;

  // append options for body
  append?: string | any;
}

/**
 * Date picker option interface for field config
 */
export interface DatePickerOption {
  // tooltip options
  position?: Placement;
  drops?: string;
  // append options for body
  append?: string | any;

  // date format
  format?: string | any;

  disableAutoUpdateInput?: boolean;
  // for time picker 
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  secondHide?: boolean;
}

/**
 * File option interface for field config
 */
export interface FileOption {
  // tooltip options
  accepts?: string | any;
  // append options for body
  controlKey?: string | any;
  round?: boolean | any;
  cropper?: boolean | any;
}

/**
 * File option interface for field config
 */
export interface SelectOption {
  // tooltip options
  append?: string | any;
  position?: Placement | any;

  // append options for body
  inputAttrs?: any
  tabIndex?: any
  virtualScroll?: boolean;
  allSelection?: boolean | any;
  open?: boolean;
  unClear?: boolean;
  hideSelected?: boolean;
  preventSearch?: boolean;
  innerSearch?: boolean;
  preventCloseOnSelect?: boolean;

  // group
  groupSelection?: boolean | any;
  groupKey?: string;
  optionGroupSelection?: boolean | any;
  checkbox?: boolean | any;

  // typeahead
  typeahead?: boolean;
  minTextForSearch?: number;

  // tag
  tag?: boolean;
}

/**
 * Range option interface for field config
 */
export interface RangeOption {
  min?: number;
  max?: number;
  step?: number;
}

/**
 * File option interface for field config
 */
export interface FormArrayOption {
  add?: boolean;
  leftAdd?: boolean;
  bottomAdd?: boolean;
  sortable?: boolean;
  delete?: boolean;
  seperator?: boolean;
  deleteConfirm?: any;
  notFound?: boolean;
}

/**
 * Error message interface for validation message config
 */
export interface ErrorMessage {
  // basic validation messages
  required?: string | any;
  min?: string | any;
  max?: string | any;
  minLength?: string | any;
  maxLength?: string | any;
  pattern?: string | any;

  // checkbox validation messages
  minSelection?: string | any;
  maxSelection?: string | any;
  reqSelection?: string | any;

  // date validation messages
  minDate?: string | any;
  maxDate?: string | any;
  noFutureDate?: string | any;
  noPastDate?: string | any;
  greaterThanDateKey?: string | any;
  lessThanDateKey?: string | any;
  greaterThanDateTimeKey?: string | any;
  lessThanDateTimeKey?: string | any;
  greaterThanTimeKey?: string | any;
  lessThanTimeKey?: string | any;

  // number validations
  greaterThanNumberKey?: string | any;
  lessThanNumberKey?: string | any;

  // file validation messages
  allowedExtensions?: string | any;
  maxFileSize?: string | any;
  minFileSize?: string | any;
  maxFileAllowed?: string | any;
  minFileAllowed?: string | any;

  // custom password validation messages
  confirmPassword?: string | any;

  // custom email validation messages
  multiEmail?: string | any;
}

/**
 * ClassName interface for form layout class config
 */
export interface ClassName {
  label?: string;
  labelMargin?: string;
  controlMargin?: string;
  labelFont?: string;
  rightLabel?: string;
  parentElement?: string;
  template?: string;
  row?: string;
  control?: string;
  horizontalLabel?: string;
  horizontalControl?: string;
  button?: string;

  // Color picker
  ok?: string | any;
  cancel?: string | any;
}


/**
 * Permission interface for form control hide/show enable/disable class config
 */
export interface Permission {
  show?: string;
  enable?: string;
  showFunc?: (data: any) => false;
  enableFunc?: (data: any) => false;
}

/**
 * Expression interface for show/enable/filter
 */
export interface Expression {
  watcher?: FieldWatcher[],
  enable?: any;
  show?: any;
  validation?: any;
  filter?: any;
  clearValidationIfNotMatch?: boolean;
  clearOptionIfNotMatch?: boolean;
}

/**
 * Field Watcher Option interface for field config
 */
export interface FieldWatcher {
  key: string,
  parentForm?: boolean;
  enable?: boolean;
  show?: boolean;
  validation?: boolean;
  filter?: boolean;
}
//#endregion