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

// default textarea configuration
const field: Field = {
  key: 'textarea',
  type: ControlType.COMPONENT,
  component: ComponentType.TEXTAREA,
  subType: InputControlType.TEXT,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.STRING
}

export class TextAreaEditorUtil {
  //#region Textarea
  /**
    * Configure Textarea
    */
  static configureTextArea(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region TextEditor
  /**
    * Configure TextEditor
    */
  static configureTextEditor(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, component: ComponentType.TEXT_EDITOR, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}