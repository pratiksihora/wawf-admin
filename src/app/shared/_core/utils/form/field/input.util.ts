// Enums
import { ComponentType } from "src/app/shared/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";
import { InputControlType } from "src/app/shared/constants/enums/controls/form/form-input-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/shared/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default input configuration
const field: Field = {
  key: 'input',
  type: ControlType.COMPONENT,
  component: ComponentType.INPUT,
  subType: InputControlType.TEXT,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {

  },
  dataType: ControlDataType.STRING
}

export class InputUtil {
  //#region Input
  /**
    * Configure Input
    */
  static configureInput(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }

  /**
    * Configure Number Input
    */
  static configureNumber(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption) {
    return {
      ...field, subType: InputControlType.NUMBER, dataType: ControlDataType.INTEGER,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }

  /**
    * Configure Float Number Input
    */
  static configureFloatInput(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption) {
    return {
      ...field, subType: InputControlType.NUMBER, dataType: ControlDataType.FLOAT,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Password Input
  /**
    * Configure Password Input
    */
  static configurePassword(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption) {
    return {
      ...field, subType: InputControlType.PASSWORD,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Email Input
  /**
    * Configure Email Input
    */
  static configureEmail(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption) {
    return {
      ...field, subType: InputControlType.EMAIL,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Url Input
  /**
    * Configure Url Input
    */
  static configureUrl(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption) {
    return {
      ...field, subType: InputControlType.URL,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}