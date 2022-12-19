// Enums
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/shared/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default form array configuration
const field: Field = {
  key: 'formarray',
  type: ControlType.FORM_ARRAY,
  fieldGroups: [],
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.ARRAY
}

export class FormArrayUtil {
  //#region Form Array
  /**
    * Configure Form Array
    */
  static configureFormArray(basic: BasicField, validation?: ValidationOption, fieldGroups?: Field[], options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, fieldGroups, formArrayOptions: CommonFieldUtil.configureFormArray(basic),
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}