// Enums
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField } from "src/app/shared/constants/models/controls/form/form-field-config/config";

// default textarea configuration
const field: Field = {
  key: 'template',
  type: ControlType.TEMPLATE,
  template: '<div class="separator separator-dashed my-3"></div>',
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
}

export class TemplateUtil {
  //#region Template
  /**
    * Configure Template
    */
  static configuretemplate(basic: BasicField,): Field {
    return {
      ...field,
      ...basic,
      template: basic.template || field.template
    }
  }
  //#endregion
}