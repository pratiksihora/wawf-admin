// Interfaces & Enums
import { ApiModule } from "src/app/api/enums/api-module.enum"
import { LayoutType, ValidationType } from "src/app/shared/constants/enums/controls/form"
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config"
import { ApiUtil } from "src/app/shared/_core/utils/api"

// Utils
import { InputUtil, SelectUtil } from "src/app/shared/_core/utils/form/field"

export const FormFields: { [key: string]: Field } = {
    name: InputUtil.configureInput({ key: 'name', label: 'Name', placeholder: 'Enter Name', smallControl: true, layout: LayoutType.VERTICAL }, { }, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    email: InputUtil.configureEmail({ key: 'email', label: 'Email', placeholder: 'Enter Email', smallControl: true, layout: LayoutType.VERTICAL }, { }, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
    mobile_no: InputUtil.configureInput({ key: 'mobile_no', label: 'Mobile Number', placeholder: 'Enter Mobile Number', smallControl: true, layout: LayoutType.VERTICAL }, { }, {}, { classNames: { label: 'fw-bold pb-2 fs-6 col-form-label' } }),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

// export const FormAPI = {
//     update: ApiUtil.configurePost({ module: ApiModule.API, url: '/v1/reseller/update/key', title: 'Update Licence Key', success: 'Update Licence key has been added successfully.' }),
// }