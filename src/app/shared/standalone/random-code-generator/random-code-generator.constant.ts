//constants
import { CAMPAIGN_API } from "src/app/api/constants/campaign/campaign-api";

// Enums & Interfaces
import { ApiMethod, ApiModule, HttpMethod } from "src/app/api/enums/api-module.enum";
import { LayoutType, ValidationType } from "src/app/constants/enums/controls/form";
import { FormStorageType } from "src/app/constants/enums/controls/form/file-storage-type.enum";
import { Field, FormGlobalConfig } from "src/app/constants/models/controls/form/form-field-config";

// Utils
import { CheckboxSwitchUtil, InputUtil } from "src/app/_core/utils/form/field";
import { ApiUtil } from "src/app/_core/utils/api";

const others = { classNames: { label: 'fw-bold fs-6 col-form-label pb-2' } };
export const FormFields: { [key: string]: Field } = {
    number_codes: InputUtil.configureNumber({
        key: 'number_codes', label: 'Number of codes', smallControl: true,
        placeholder: 'Enter count', layout: LayoutType.VERTICAL
    }, { required: true, type: ValidationType.MAX_100 }, {}, others),
    single_length: InputUtil.configureNumber({
        key: 'single_length', label: 'Single code length', smallControl: true,
        placeholder: 'e.g. 10', layout: LayoutType.VERTICAL
    }, { required: true, type: ValidationType.MAX_20 }, {}, others),
    code_prefix: InputUtil.configureInput({
        key: 'code_prefix', label: 'Code prefix', smallControl: true,
        placeholder: 'Text prepended before the random code', layout: LayoutType.VERTICAL
    }, { required: false, type: ValidationType.MAX_LENGTH_20 }, {}, others),
    code_postfix: InputUtil.configureInput({
        key: 'code_postfix', label: 'Code Suffix', smallControl: true,
        placeholder: 'Text appended after the random code', layout: LayoutType.VERTICAL
    }, { required: false, type: ValidationType.MAX_LENGTH_20 }, {}, others),
}

export const FormConfig: FormGlobalConfig = {
    templateOptions: {
        solidControl: true,
    }
}

