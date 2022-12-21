// Interfaces & Enums
import { LayoutType } from "src/app/shared/constants/enums/controls/form"
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config"

// Utils
import { InputUtil, SelectUtil } from "src/app/shared/_core/utils/form/field"

export const FormFields: { [key: string]: Field } = {
    time: SelectUtil.configureSelect({ key: 'time', label: 'Anti-Fraud Rule', smallControl: true, layout: LayoutType.VERTICAL, }, { required: true }, { options: [{ value: '1 Month', text: '1 Month' }, { value: '2 Month', text: '2 Month' }] }, { classNames: { label: 'fw-bold pb-4 fs-6 col-form-label' } }),
    number_device: InputUtil.configureNumber({ key: 'number_device', label: 'Value', placeholder: 'Enter Value', smallControl: true, layout: LayoutType.VERTICAL }, { required: true }, {}, { classNames: { label: 'fw-bold pb-4 fs-6 col-form-label' } }),
    plan_type: SelectUtil.configureSelect({ key: 'plan_type', label: 'Anti-Fraud Rule', smallControl: true, layout: LayoutType.VERTICAL, }, { required: true }, { options: [{ value: 'platinum', text: 'Platinum' }] }, { classNames: { label: 'fw-bold pb-4 fs-6 col-form-label' } }),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

// export const FormAPI = {
//     get: ApiUtil.configureGet({ module: ApiModule.WORKSPACE, url: CAMPAIGN_FOLDER_API.GET_BY_ID }),
//     add: ApiUtil.configurePost({ module: ApiModule.WORKSPACE, url: CAMPAIGN_FOLDER_API.ADD, title: 'Folder', success: 'Folder has been added successfully.' }),
//     update: ApiUtil.configurePatch({ module: ApiModule.WORKSPACE, url: CAMPAIGN_FOLDER_API.UPDATE, title: 'Folder', success: 'Folder has been updated successfully.' }),
// }