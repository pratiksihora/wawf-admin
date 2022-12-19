// Enums
import { ComponentType } from "src/app/shared/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/shared/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default textarea configuration
const field: Field = {
  key: 'range',
  type: ControlType.COMPONENT,
  component: ComponentType.RANGE,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.INTEGER,
  defaultValue: 1,
  rangeOptions: {
    step: 1,
    min: 1,
    max: 12
  }
}

export class RangeUtil {
  //#region Range
  /**
    * Configure Range
    */
  static configureRange(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, rangeOptions: CommonFieldUtil.configureRange(basic), ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}