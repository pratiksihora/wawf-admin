// Enums
import { ComponentType } from "src/app/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default radio configuration
const field: Field = {
  key: 'Border',
  type: ControlType.COMPONENT,
  component: ComponentType.BORDER,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.STRING,
  options: [{
    text: 'None',
    value: 'none',
    className: 'bg-gray-200'
  }, {
    text: 'Dashed',
    value: 'dashed',
    className: 'border border-2 border-gray-500 border-dashed'
  }, {
    text: 'Dotted',
    value: 'dotted',
    className: 'border border-2 border-gray-500 border-dotted'
  },
  {
    text: 'Solid',
    value: 'solid',
    className: 'border border-2 border-gray-500'
  }]
}

export class BorderUtil {
  //#region Border
  /**
    * Configure Border
    */
  static configureBorder(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}