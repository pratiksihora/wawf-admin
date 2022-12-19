// Enums
import { ComponentType } from "src/app/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default date configuration
const field: Field = {
  key: 'date',
  type: ControlType.COMPONENT,
  component: ComponentType.DATE_PICKER,
  hidden: false,
  readonly: false,
  disabled: false,
  dataType: ControlDataType.DATE,
  datePickerOptions: {
    disableAutoUpdateInput: false,
  }
}

export class DateUtil {
  //#region Date Picker
  /**
    * Configure Date Picker
    */
  static configureDate(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return { ...field, ...CommonFieldUtil.configureField(basic, validation, options, others) }
  }
  //#endregion

  //#region Date Time Picker
  /**
    * Configure Date Time Picker
    */
  static configureDateTime(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption) {
    return {
      ...field, component: ComponentType.DATE_TIME_PICKER, dataType: ControlDataType.DATE_TIME,
      ...CommonFieldUtil.configureField(basic, validation, options, others)
    }
  }
  //#endregion

  //#region Date Range Picker
  /**
    * Configure Date Range Picker
    */
  static configureDateRange(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption) {
    return {
      ...field, component: ComponentType.DATE_RANGE_PICKER, dataType: ControlDataType.DATE_RANGE,
      ...CommonFieldUtil.configureField(basic, validation, options, others)
    }
  }
  //#endregion
}