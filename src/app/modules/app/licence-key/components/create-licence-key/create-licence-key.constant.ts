// Interfaces & Enums
import { ApiModule } from "src/app/api/enums/api-module.enum"
import { LayoutType, ValidationType } from "src/app/shared/constants/enums/controls/form"
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config"
import { ApiUtil } from "src/app/shared/_core/utils/api"

// Utils
import { InputUtil, SelectUtil } from "src/app/shared/_core/utils/form/field"

export const FormFields: { [key: string]: Field } = {
    no_of_month: SelectUtil.configureSelect({ key: 'no_of_month', label: 'Duration',placeholder:'Time', smallControl: true, layout: LayoutType.VERTICAL, }, { required: true }, {
        options: [
            { value: 1, text: '1 Month' }, { value: 2, text: '2 Month' }, { value: 3, text: '3 Month' },
            { value: 4, text: '4 Month' }, { value: 5, text: '5 Month' }, { value: 6, text: '6 Month' },
            { value: 7, text: '7 Month' }, { value: 8, text: '8 Month' }, { value: 9, text: '9 Month' },
            { value: 10, text: '10 Month' }, { value: 11, text: '11 Month' }, { value: 12, text: '12 Month' },
        ]
    }, { classNames: { label: 'fw-bold pb-4 fs-6 col-form-label' } }),
    no_of_device: InputUtil.configureNumber({ key: 'no_of_device', label: 'Number of Devices', placeholder: 'Enter Value', smallControl: true, layout: LayoutType.VERTICAL }, { required: true, type: ValidationType.MAX_100 }, {}, { classNames: { label: 'fw-bold pb-4 fs-6 col-form-label' } }),
    plan_type: SelectUtil.configureSelect({ key: 'plan_type', label: 'Plan Type', smallControl: true, layout: LayoutType.VERTICAL, }, { required: true }, { options: [{ value: 'Premium', text: 'Platinum' }] }, { classNames: { label: 'fw-bold pb-4 fs-6 col-form-label' } }),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

export const FormAPI = {
    add: ApiUtil.configurePost({ module: ApiModule.API, url: '/v1/reseller/generate/key', title: 'Create Licence Key', success: 'Create Licence key has been added successfully.' }),
}