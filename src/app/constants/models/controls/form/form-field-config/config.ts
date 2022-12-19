// Enums
import { LayoutType } from "src/app/constants/enums/controls/form";
import { FormStorageType } from "src/app/constants/enums/controls/form/file-storage-type.enum";
import { CheckBoxRadioLayoutType } from "src/app/constants/enums/controls/form/form-checkbox-radio-layout-type.enum";
import { InputControlType } from "src/app/constants/enums/controls/form/form-input-control-type.enum";
import { FormOptionType } from "src/app/constants/enums/controls/form/form-option-type.enum";
import { ValidationType } from "src/app/constants/enums/controls/form/form-validation-type.enum";

// Interfaces
import { ApiAction } from "../../../api";
import { Validation, Option, ExpressionOption } from "./index";

export interface BasicField {
  key?: string;
  label?: string;
  placeholder?: string;
  hidePlaceHolder?: boolean,
  hidden?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  subType?: InputControlType;
  template?: string;
  defaultValue?: any;
  firstSelect?: boolean;
  rows?: number,
  layout?: LayoutType,
  optionLayout?: CheckBoxRadioLayoutType;
  smallControl?: boolean;
  largeControl?: boolean;
  solidControl?: boolean;
  inlineControl?: boolean;
  multiple?: boolean;
  withoutLabel?: boolean;
  checkbox?: boolean;
  group?: string;
  append?: string;
  position?: string;
  colorpPositionOffset?: string;
  typeahead?: boolean;
  sortable?: boolean;
  half?: boolean;
  row?: string;
  preSeperator?: boolean;
  postSeperator?: boolean;
  prefix?: string;
  rangeSuffix?: string;
  seperator?: boolean;
  url?: string;
  textKey?: string;
  valueKey?: string;
  min?: number;
  max?: number;
  step?: number;
  unClear?: boolean;
  grid?: string;
  open?: string;
  autoUpdate?: boolean;
  showOperator?: string;
  enableOperator?: string;
  filterOperator?: string;
  validationOperator?: string;
  showExpr?: ExpressionOption[];
  enableExpr?: ExpressionOption[];
  filterExpr?: ExpressionOption[];
  validationExpr?: ExpressionOption[];
  validation?: Validation;
}

export interface CustomizeOptions {
  // its mostly use for modify payload, options, request and response data
  prepareOptions?: any;
  prepareApiPayload?: any;
  prepareRequest?: any;
  prepareResponse?: any;

  type?: FormOptionType;
  storage?: FormStorageType;
  options?: string[] | Option[] | any;
  api?: ApiAction;
  url?: string;
}

export interface ValidationOption {
  required?: boolean;
  type?: ValidationType | any;
  key?: string;
  noPastDate?: boolean;
  validations?: Validation;
}
