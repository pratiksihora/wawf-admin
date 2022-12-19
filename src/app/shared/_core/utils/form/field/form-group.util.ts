// Enums
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/shared/constants/models/controls/form/form-field-config/config";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default file configuration
const field: Field = {
  key: 'formgroup',
  type: ControlType.FORM_GROUP,
  fieldGroups: [],
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.OBJECT
}

export class FormGroupUtil {
  //#region Form Group
  /**
    * Configure Form Group
    */
  static configureFormGroup(basic: BasicField, validation?: ValidationOption, fieldGroups?: Field[], options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, fieldGroups,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}