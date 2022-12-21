// Enums & Interfaces
import { LayoutType, ValidationType } from "src/app/shared/constants/enums/controls/form";
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config";

// Utils
import { InputUtil, SelectUtil } from "src/app/shared/_core/utils/form/field";

const others = { classNames: { label: 'fw-bold fs-6 col-form-label pb-2' } };
export const FormFields: { [key: string]: Field } = {
    time_to_extend: SelectUtil.configureSelect({ key: 'time_to_extend', label: 'Time to Extend', smallControl: true, layout: LayoutType.VERTICAL, }, { required: true }, { options: [{ value: '1 Month', text: '1 Month' }, { value: '2 Month', text: '2 Month' }] }, others),
    number_of_device: InputUtil.configureNumber({
        key: 'number_of_device', label: 'Number Of Device', defaultValue: 2, disabled: true, smallControl: true,
        placeholder: 'e.g. 10', layout: LayoutType.VERTICAL
    }, { required: false }, {}, others),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

