// Enums & Interfaces
import { ApiModule } from "src/app/api/enums/api-module.enum";
import { LayoutType, ValidationType } from "src/app/shared/constants/enums/controls/form";
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config";
import { ApiUtil } from "src/app/shared/_core/utils/api";

// Utils
import { InputUtil, SelectUtil } from "src/app/shared/_core/utils/form/field";

const others = { classNames: { label: 'fw-bold fs-6 col-form-label pb-2' } };
export const FormFields: { [key: string]: Field } = {
    sk_no_of_month: SelectUtil.configureSelect({ key: 'sk_no_of_month', label: 'Time to Extend', smallControl: true, unClear: true, layout: LayoutType.VERTICAL, }, { required: true }, { options: [{ value: 1, text: '1 Month' }, { value: 2, text: '2 Month' }, { value: 3, text: '3 Month' }, { value: 4, text: '4 Month' }, { value: 5, text: '5 Month' }] }, others),
    sk_no_of_login: InputUtil.configureNumber({
        key: 'sk_no_of_login', label: 'Number Of Device', disabled: true, smallControl: true,
        placeholder: 'e.g. 10', layout: LayoutType.VERTICAL
    }, { required: false }, {}, others),
}

// export const FormAPI = {
//     update: ApiUtil.configurePost({ module: ApiModule.API, url: '/v1/reseller/extend/key', title: 'Licence Key', success: 'Licence Key has been update successfully.' }),
// }

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

