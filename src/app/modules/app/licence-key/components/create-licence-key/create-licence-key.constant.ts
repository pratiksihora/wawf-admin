// Interfaces & Enums
import { ApiModule } from "src/app/api/enums/api-module.enum"
import { LayoutType, ValidationType } from "src/app/shared/constants/enums/controls/form"
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config"
import { ApiUtil } from "src/app/shared/_core/utils/api"

// Utils
import { InputUtil, RadioUtil, SelectUtil } from "src/app/shared/_core/utils/form/field"

export const FormFields: { [key: string]: Field } = {
    select_duration: RadioUtil.configureRadio({ key: 'select_duration', label: 'Select Duration', smallControl: true, layout: LayoutType.VERTICAL, defaultValue: 'no_of_month' }, {}, {
        options: [
            { value: 'no_of_month', text: 'Number of Month' }, { value: 'lifetime', text: 'Lifetime' },
        ]
    }, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    no_of_month: SelectUtil.configureSelect({ key: 'no_of_month', label: 'Number of Month', placeholder: 'Time', smallControl: true, layout: LayoutType.VERTICAL, showExpr: [{ key: 'select_duration', value: ['no_of_month'] }], validationExpr: [{ key: 'select_duration', value: ['no_of_month'] }] }, {}, {
        options: [
            { value: 1, text: '1 Month' }, { value: 2, text: '2 Month' }, { value: 3, text: '3 Month' },
            { value: 4, text: '4 Month' }, { value: 5, text: '5 Month' }, { value: 6, text: '6 Month' },
            { value: 7, text: '7 Month' }, { value: 8, text: '8 Month' }, { value: 9, text: '9 Month' },
            { value: 10, text: '10 Month' }, { value: 11, text: '11 Month' }, { value: 12, text: '12 Month' },
        ]
    }, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    no_of_device: InputUtil.configureNumber({ key: 'no_of_device', label: 'Number of Devices', placeholder: 'Enter Value', smallControl: true, layout: LayoutType.VERTICAL }, { validations: { validators: { required: true, min: 0, max: 100 } } }, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    name: InputUtil.configureInput({ key: 'name', label: 'Name', placeholder: 'Enter Name', smallControl: true, layout: LayoutType.VERTICAL }, {}, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    email: InputUtil.configureEmail({ key: 'email', label: 'Email', placeholder: 'Enter Email', smallControl: true, layout: LayoutType.VERTICAL }, {}, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    mobile_no: InputUtil.configureInput({ key: 'mobile_no', label: 'Mobile Number', placeholder: 'Enter Mobile Number', smallControl: true, layout: LayoutType.VERTICAL }, {}, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    plan_type: SelectUtil.configureSelect({ key: 'plan_type', label: 'Plan Type', smallControl: true, layout: LayoutType.VERTICAL, }, { required: true }, { options: [{ value: 'Premium', text: 'Platinum' }] }, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

export const FormAPI = {
    add: ApiUtil.configurePost({ module: ApiModule.API, url: '/v1/reseller/generate/key', title: 'Create Licence Key', success: 'Create Licence key has been added successfully.' }),
}