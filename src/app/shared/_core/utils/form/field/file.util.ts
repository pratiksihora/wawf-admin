// Enums
import { FILE_API_ACTION } from "src/app/constants/common-constants/file-api";
import { ComponentType } from "src/app/shared/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/shared/constants/models/controls/form/form-field-config/config";
import { ApiAction } from "../../../../constants/models/api";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default file configuration
const field: Field = {
  key: 'file',
  type: ControlType.COMPONENT,
  component: ComponentType.IMAGE_UPLOAD,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.STRING
}

export class FileUtil {
  //#region Image
  /**
    * Configure Image
    */
  static configureImage(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Logo
  /**
    * Configure Image
    */
  static configureLogo(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, component: ComponentType.LOGO, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Multiple Image List
  /**
    * Configure Multiple Image List
    */
  static configureMultiImage(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, component: ComponentType.MULTI_IMAGE_UPLOAD,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Multiple File List
  /**
    * Configure Multiple File List
    */
  static configureMultiFile(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, component: ComponentType.FILE_ATTACHMENT,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion

  //#region Multiple File List
  /**
    * Configure Multiple File List
    */
  static configureImageUploader(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, component: ComponentType.IMAGE,
      ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }

  /**
   *Configure upload payload 
   */
  static configureUploadPayload(payload: ApiAction) {
    return  { ...FILE_API_ACTION, ...payload }
  }
  
  //#endregion
}