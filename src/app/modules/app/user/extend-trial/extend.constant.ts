// Enums & Interfaces
import { ApiModule } from "src/app/api/enums/api-module.enum";
import { LayoutType, ValidationType } from "src/app/shared/constants/enums/controls/form";
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config";
import { ApiUtil } from "src/app/shared/_core/utils/api";

// Utils
import { InputUtil, SelectUtil } from "src/app/shared/_core/utils/form/field";

const others = { classNames: { label: 'fw-bold fs-6 col-form-label pb-2' } };
export const FormFields: { [key: string]: Field } = {
    amount: InputUtil.configureNumber({ key: 'amount', label: 'Value', placeholder: 'Enter Value', smallControl: true, layout: LayoutType.VERTICAL }, { required: true }, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    type: SelectUtil.configureSelect({ key: 'type', label: 'Type', smallControl: true, layout: LayoutType.VERTICAL, }, {}, {
        options: [
            { value: 'day', text: 'Day' }, { value: 'month', text: 'Month' }, { value: 'week', text: 'Week' },
        ]
    }, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
}

export const FormAPI = {
    update: ApiUtil.configurePost({ module: ApiModule.API, url: '/v1/reseller/extend/trial', title: 'Extend Trial', success: 'Extend trial has been update successfully.' }),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

