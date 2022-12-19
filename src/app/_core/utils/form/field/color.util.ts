// Enums
import { ComponentType } from "src/app/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default color configuration
const field: Field = {
  key: 'color',
  type: ControlType.COMPONENT,
  component: ComponentType.COLOR_INPUT,
  defaultValue: '#000000',
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.STRING
}

export class ColorUtil {
  //#region Color
  /**
    * Configure Color
    */
  static configureColorInput(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field,
      colorOptions: CommonFieldUtil.configureColor(basic),
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}