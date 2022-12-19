// Enums
import { ComponentType } from "src/app/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default checkbox switch configuration
const field: Field = {
  key: 'checkbox',
  type: ControlType.COMPONENT,
  component: ComponentType.CHECKBOX,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.BOOLEAN
}

export class CheckboxSwitchUtil {
  //#region Checkbox
  /**
    * Configure Checkbox
    */
  static configureCheckbox(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Checkbox List
  /**
    * Configure Checkbox List
    */
  static configureCheckboxList(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, component: ComponentType.CHECKBOX_LIST,
      prepareOptions: ({ options, values }: any): any => {
        return options.map((op: any) => ({
          ...op,
          selected: !!(values || []).find((a: any) => a === op.value)
        }))
      },
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Switch
  /**
    * Configure Switch
    */
  static configureSwitch(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, component: ComponentType.SWITCH, defaultValue: false, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}