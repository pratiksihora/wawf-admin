import { ControlDataType } from "src/app/constants/enums/controls/form/form-control-data-type.enum";
import { ControlType } from "src/app/constants/enums/controls/form/form-control-type.enum";
import { Field } from "src/app/constants/models/controls/form/form-field-config";
import { DateUtil } from "../../date";

export class IncomingUtil {

  static prepareIncoming({ formFields, payload }: any) {
    let formValue = {};
    if (Array.isArray(formFields)) {
      (formFields as Field[]).forEach(field => {
        this.controlPayload(field, payload, formValue)
      })
    } else {
      Object.keys(formFields as { [key: string]: Field }).forEach(field => {
        this.controlPayload(formFields[field], payload, formValue)
      })
    }
    return formValue;
  }

  static controlPayload(field: Field, payload: any, formValue: any) {
    switch (field.type) {
      case ControlType.COMPONENT:
        this.convertComponentPayload(field, payload, formValue);
        break;
      case ControlType.ROW:
        field.fieldGroups?.forEach(subField => {
          this.convertComponentPayload(subField, payload, formValue);
        });
        break;
      case ControlType.FORM_GROUP:
        formValue[field.key] = {};
        field.fieldGroups?.forEach(subField => {
          this.convertComponentPayload(subField, { ...payload, ...payload[field.key] }, formValue[field.key]);
        });
        break;
      case ControlType.FORM_ARRAY:
        formValue[field.key] = [];
        if (payload[field.key]?.length) {
          payload[field.key].forEach((value: any) => {
            let obj: any = {};
            field.fieldGroups?.forEach(subField => {
              this.convertComponentPayload(subField, { ...payload, ...value }, obj);
            });
            formValue[field.key].push(obj);
          });
        }
        break;
      case ControlType.TEMPLATE:
        break;
      default:
        break;
    }
    return formValue;
  }

  static convertComponentPayload(field: Field, payload: any, formValue: any) {
    if (!field.prepareIncoming) {
      formValue[field.key] = this.convertValue(field.dataType, payload[field.key]);
      return formValue;
    }

    const response = field.prepareIncoming({ field, payload });
    formValue[response.key] = response.value;
    return formValue;
  }

  static convertValue(type?: ControlDataType, value?: any) {
    if ((value === null || value === undefined) && type === ControlDataType.BOOLEAN) return false;
    if (value === null || value === undefined) return value;
    if (!type) return value;
    switch (type) {
      case ControlDataType.INTEGER:
        return parseInt(value);
      case ControlDataType.FLOAT:
        return parseFloat(value);
      case ControlDataType.ARRAY:
        return value;
      case ControlDataType.BOOLEAN:
        return !!(value?.toString() === 'true');
      case ControlDataType.DATE:
        return DateUtil.systemDateToDatePicker(value);
      case ControlDataType.DATE_TIME:
        return DateUtil.systemDateTimeToDateTimePicker(value);
      default:
        return value.toString();
    }
  }
}