// Enums & Interfaces
import { ApiModule } from "src/app/api/enums/api-module.enum";
import { LayoutType, ValidationType } from "src/app/shared/constants/enums/controls/form";
import { Field, FormGlobalConfig } from "src/app/shared/constants/models/controls/form/form-field-config";
import { ApiUtil } from "src/app/shared/_core/utils/api";

// Utils
import { InputUtil, SelectUtil } from "src/app/shared/_core/utils/form/field";

const others = { classNames: { label: 'fw-bold fs-6 col-form-label pb-2' } };
export const FormFields: { [key: string]: Field } = {
    oldPassword: InputUtil.configurePassword({
        key: 'oldPassword', label: 'Old Password', smallControl: true,
        layout: LayoutType.VERTICAL
    }, { required: true }, {}, others),
    newPassword: InputUtil.configurePassword({
        key: 'newPassword', label: 'New Password', smallControl: true,
        layout: LayoutType.VERTICAL
    }, { required: true }, {}, others),
    confirmPassword: InputUtil.configurePassword({
        key: 'confirmPassword', label: 'Confirm Password', smallControl: true,
        layout: LayoutType.VERTICAL
    }, { required: true }, {}, others),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

