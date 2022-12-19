// Enums
import { ComponentType } from "src/app/shared/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/shared/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default select configuration
const field: Field = {
  key: 'select',
  type: ControlType.COMPONENT,
  component: ComponentType.SELECT,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.STRING,
  selectOptions: {
    virtualScroll: true
  }
}

export class SelectUtil {
  //#region Select
  /**
    * Configure Select
    */
  static configureSelect(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, selectOptions: CommonFieldUtil.configureSelect(basic), ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Multi Select
  /**
    * Configure Multi Select
    */
  static configureMultiSelect(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    basic.multiple = true;
    return {
      selectOptions: CommonFieldUtil.configureSelect(basic),
      ...field, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Multi Select With Checkbox
  /**
    * Configure Multi Select With Checkbox
    */
  static configureMultiSelectCheckbox(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    basic.multiple = true;
    basic.checkbox = true;
    return {
      ...field,
      selectOptions: CommonFieldUtil.configureSelect(basic),
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

}