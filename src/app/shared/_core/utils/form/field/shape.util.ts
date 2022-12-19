// Enums
import { ComponentType } from "src/app/shared/constants/enums/controls/form/form-component-type.enum";
import { ControlDataType } from "src/app/shared/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/shared/constants/enums/controls/form/form-control-type.enum";

// Interfaces
import { Field, FieldOption } from "src/app/shared/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/shared/constants/models/controls/form/form-field-config/config";
import { BtnShapeType } from "src/app/modules/business-base/workspace/editor/constants/enums/btn-shape.enum";

// Utils
import { CommonFieldUtil } from "./common-field.util";

// default radio configuration
const field: Field = {
  key: 'shape',
  type: ControlType.COMPONENT,
  component: ComponentType.SHAPE,
  hidden: false,
  readonly: false,
  disabled: false,
  displayOptions: {
  },
  dataType: ControlDataType.STRING,
  options: [{
    text: 'Shape 1',
    value: BtnShapeType.BACKGROUND,
    svg: 'assets/media/inline-svg/editor/button-shape/button-1.svg'
  }, {
    text: 'Shape 2',
    value: BtnShapeType.BACKGROUND_SHADOW,
    svg: 'assets/media/inline-svg/editor/button-shape/button-2.svg'
  }, {
    text: 'Shape 3',
    value: BtnShapeType.BACKGROUND_BORDER,
    svg: 'assets/media/inline-svg/editor/button-shape/button-3.svg'
  },
  {
    text: 'Shape 4',
    value: BtnShapeType.BACKGROUND_INNERSHADOW,
    svg: 'assets/media/inline-svg/editor/button-shape/button-4.svg'
  }]
}

export class ShapeUtil {
  //#region Shape
  /**
    * Configure Shape
    */
  static configureShape(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: FieldOption): Field {
    return {
      ...field, ...CommonFieldUtil.configureField(basic, validation, options, others),
    }
  }
  //#endregion
}