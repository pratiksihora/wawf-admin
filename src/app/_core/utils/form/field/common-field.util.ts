// Enums
import { ApiMethod, ApiModule, HttpMethod } from "src/app/api/enums/api-module.enum";
import { Placement } from "src/app/constants/enums/common/placement/placement.enum";
import { FormStorageType } from "src/app/constants/enums/controls/form/file-storage-type.enum";
import { FormOptionType } from "src/app/constants/enums/controls/form/form-option-type.enum";
import { ValidationType } from "src/app/constants/enums/controls/form/form-validation-type.enum";

// Interfaces
import { ClassName, ColorOption, Expression, Field, FieldOption, FormArrayOption, RangeOption, SelectOption, TemplateOption, Validation } from "src/app/constants/models/controls/form/form-field-config";
import { BasicField, CustomizeOptions, ValidationOption } from "src/app/constants/models/controls/form/form-field-config/config";

export class CommonFieldUtil {

  static configureField(basic: BasicField, validation?: ValidationOption, options?: CustomizeOptions, others?: Field | FieldOption): Field | any {
    return {
      ...basic, displayOptions: { label: basic.label, placeholder: basic.placeholder, hidePlaceHolder: basic.hidePlaceHolder },
      validations: CommonFieldUtil.configureValidation(validation),
      classNames: CommonFieldUtil.configureClassName(basic),
      templateOptions: CommonFieldUtil.configureTemplateOption(basic),
      expression: CommonFieldUtil.configureExpression(basic),
      ...this.configureApiorOptions(basic, options), ...others
    }
  }

  static configureApiorOptions(basic: BasicField, options?: CustomizeOptions) {
    if (basic.url) {
      return {
        api: {
          module: ApiModule.BUSINESS,
          httpMethod: HttpMethod.GET,
          url: basic.url,
          response: (data: any) => {
            return data.data.map((item: any) => ({ text: item[basic.textKey || 'text'], value: item[basic.valueKey || 'value'] }));
          }
        }
      }
    }

    if (!options) return undefined;

    if (options.api) {
      options.api.module = options.api.module || ApiModule.BUSINESS;
      options.api.method = options.api.method || ApiMethod.LOOKUP;
      options.api.httpMethod = options.api.httpMethod || HttpMethod.GET;
      options.api.storage = options.api.storage || FormStorageType.DEFAULT;
      return options;
    }

    if (options.type) return this.predefindOptions(options);

    if (!options.api) return options;

    return options;
  }

  // configure defaulr field as solid control
  static configureTemplateOption(field: BasicField | any): TemplateOption | undefined {
    let templateFields = ['layout', 'optionLayout', 'smallControl', 'largeControl', 'solidControl', 'inlineControl', 'multiple', 'withoutLabel', 'preSeperator', 'postSeperator', 'rangeSuffix', 'grid', 'open', 'autoUpdate', 'unClear'];

    if (!templateFields.some((tf: any) => field[tf] !== undefined)) { return { solidControl: true } }

    return templateFields.reduce((previous: any, newVal: any) => {
      if (newVal === 'solidControl' && field[newVal] === undefined) {
        previous[newVal] = true;
        return previous;
      }
      if (field[newVal])
        previous[newVal] = field[newVal];
      return previous;
    }, {})
  }

  static configureClassName(field: BasicField): ClassName {
    return {
      row: field.half ? 'col-md-6' : field.row
    }
  }

  static configureColor(basic?: BasicField | any): ColorOption {
    return {
      append: basic.append || undefined,
      position: basic.position || undefined,
      colorMode: 'color',
      positionRelativeToArrow: false,
      okHide: true,
      cancelHide: true,
      positionOffset: basic.colorpPositionOffset
    }
  }

  static configureFormArray(basic?: BasicField | any): FormArrayOption {
    return {
      add: !basic.position,
      bottomAdd: basic.position === Placement.Bottom,
      leftAdd: basic.position === Placement.Left,
      delete: true,
      notFound: true,
      deleteConfirm: false,
      seperator: basic.seperator === undefined ? true : basic.seperator,
      sortable: basic.sortable
    }
  }

  static configureSelect(basic?: BasicField | any): SelectOption {
    return {
      allSelection: basic.multiple || false,
      checkbox: basic.checkbox,
      virtualScroll: true,
      groupKey: basic.group || undefined,
      groupSelection: !!basic.group,
      minTextForSearch: 1,
      preventCloseOnSelect: true,
      append: basic.append || undefined,
      position: basic.position || undefined,
      typeahead: basic.typeahead || false,
      unClear: basic.unClear || false,
    }
  }

  static configureRange(basic?: BasicField | any): RangeOption {
    if (!basic.min && !basic.max && !basic.step) return;
    return {
      min: basic.min,
      max: basic.max,
      step: basic.step
    }
  }

  static checkValidExpression(form, basic, option) {
    if (basic[option.operator] === 'or') {
      return basic[option.expr].some((curt) => {
        return curt.exist ? !!form.get(curt.key)?.value : (Array.isArray(curt.value) ? curt.value : [curt.value]).some(val => val === form.get(curt.key)?.value)
      });
    }
    return basic[option.expr].every((curt) => {
      return curt.exist ? !!form.get(curt.key)?.value : (Array.isArray(curt.value) ? curt.value : [curt.value]).some(val => val === form.get(curt.key)?.value)
    });
  }

  // { operator: 'enableOperator', expr: 'enableExpr' }
  static configureExpression(basic?: BasicField | any): Expression {
    if (!basic.showExpr && !basic.enableExpr && !basic.filterExpr && !basic.validationExpr) return undefined;

    const watcher = [];

    basic.showExpr?.forEach(a => {
      watcher.push({ key: a.key, show: true, parentForm: a.parent });
    })

    basic.enableExpr?.forEach(a => {
      let match = watcher.find(b => b.key === a.key);
      match ? match.enable = true : watcher.push({ key: a.key, enable: true });
    })

    basic.filterExpr?.forEach(a => {
      let match = watcher.find(b => b.key === a.key);
      match ? match.filter = true : watcher.push({ key: a.key, filter: true });
    })

    basic.validationExpr?.forEach(a => {
      let match = watcher.find(b => b.key === a.key);
      match ? match.validation = true : watcher.push({ key: a.key, validation: true });
    })

    return {
      show: basic.showExpr?.length ? ({ form }: any) => {
        return this.checkValidExpression(form, basic, { operator: 'showOperator', expr: 'showExpr' });
      } : undefined,
      enable: basic.enableExpr?.length ? ({ form }: any) => {
        return this.checkValidExpression(form, basic, { operator: 'enableOperator', expr: 'enableExpr' });
      } : undefined,
      filter: basic.filterExpr?.length ? ({ form }: any) => {
        if (!this.checkValidExpression(form, basic, { operator: 'filterOperator', expr: 'filterExpr' })) return;

        return basic.filterExpr.reduce((prev, curt) => {
          prev[curt.key] = form.get(curt.key)?.value;
          return prev;
        }, {});
      } : undefined,
      validation: basic.validationExpr?.length ? ({ form }: any) => {
        if (!this.checkValidExpression(form, basic, { operator: 'validationOperator', expr: 'validationExpr' })) return;
        return basic.validation || { validators: { required: true } };
      } : undefined,
      watcher,
    }
  }

  static configureValidation(option: ValidationOption | any): Validation | undefined {
    if (!option) return undefined;

    if (!option.type && !option.required) return option.validations;

    if (!option.type && option.required) return { validators: { required: true } };

    switch (option.type) {
      case ValidationType.REQUIRED:
        return { validators: { required: true } };
      case ValidationType.DEFAULT_INPUT:
        return { validators: { required: true, minLength: 3, maxLength: 100 } };
      case ValidationType.PASSWORD:
        return { validators: { required: true, minLength: 8, maxLength: 20 } };
      case ValidationType.MAX_LENGTH_30:
        return { validators: { required: true, minLength: 3, maxLength: 30 } };
      case ValidationType.MAX_LENGTH_20:
        return { validators: { required: false, maxLength: 20 } };
      case ValidationType.MIN_1:
        return { validators: { required: option.required, min: 1 } };
      case ValidationType.MAX_100:
        return { validators: { required: option.required, max: 100 } };
      case ValidationType.MAX_20:
        return { validators: { required: option.required, max: 20 } };
      case ValidationType.MAX_LENGTH_3:
        return { validators: { required: option.required, maxLength: 3 } };
      case ValidationType.MAX_LENGTH_400:
        return { validators: { required: option.required, maxLength: 400 } };
      case ValidationType.MAX_LENGTH_100:
        return { validators: { required: option.required, maxLength: 100 } };
      case ValidationType.POSITIVE_FROM_1:
        return { validators: { required: option.required, min: 1 } };
      case ValidationType.POSITIVE:
        return { validators: { required: option.required, min: 0 } };
      case ValidationType.NEGATIVE:
        return { validators: { required: option.required, max: 0 } };
      case ValidationType.REQUIRED_CHECKBOX:
        return { validators: { reqSelection: true } };
      case ValidationType.NO_FUTURE_DATE:
        return { validators: { required: option.required, noFutureDate: true } };
      case ValidationType.NO_PAST_DATE:
        return { validators: { required: option.required, noPastDate: true } };
      case ValidationType.GREATER_THAN_DATE:
        return { validators: { required: option.required, noPastDate: option.noPastDate, greaterThanDateKey: option.key } };
      case ValidationType.LESS_THAN_DATE:
        return { validators: { required: option.required, noPastDate: option.noPastDate, lessThanDateKey: option.key } };
      case ValidationType.MAX_FILE_SIZE_2_MB:
        return { validators: { required: option.required, maxFileSize: 2 } };
      case ValidationType.MAX_FILE_SIZE_5_MB:
        return { validators: { required: option.required, maxFileSize: 5 } };
      case ValidationType.MAX_FILE_SIZE_10_MB:
        return { validators: { required: option.required, maxFileSize: 10 } };
      case ValidationType.MIN_FILE_1:
        return { validators: { required: option.required, minFileAllowed: 1 } };
      case ValidationType.MIN_FILE_2:
        return { validators: { required: option.required, minFileAllowed: 2 } };
      case ValidationType.MAX_FILE_1:
        return { validators: { required: option.required, maxFileAllowed: 1 } };
      case ValidationType.MAX_FILE_5:
        return { validators: { required: option.required, maxFileAllowed: 5 } };
      case ValidationType.MAX_FILE_10:
        return { validators: { required: option.required, maxFileAllowed: 10 } };
      default:
        return undefined;
    }
  }

  static predefindOptions(option) {
    if (!option) return undefined;

    if (!option.type) return undefined;

    let options;
    switch (option.type) {
      case FormOptionType.ALIGNMENT:
        options = {
          options: [{ value: 'left', text: 'Left', svgIcon: './assets/media/inline-svg/editor/alignment-left.svg' },
          { value: 'center', text: 'Center', svgIcon: './assets/media/inline-svg/editor/alignment-center.svg' },
          { value: 'right', text: 'Right', svgIcon: './assets/media/inline-svg/editor/alignment-right.svg' },
          { value: 'justify', text: 'Justified', svgIcon: './assets/media/inline-svg/editor/alignment-justify.svg' }]
        }
        break;
      case FormOptionType.MORE_ALIGNMENT:
        options = {
          options: [
            { value: 'left', text: 'Left1', svgIcon: './assets/media/inline-svg/editor/alignment-left.svg' },
            { value: 'center', text: 'Center1', svgIcon: './assets/media/inline-svg/editor/alignment-center.svg' },
            { value: 'right', text: 'Right1', svgIcon: './assets/media/inline-svg/editor/alignment-right.svg' },
            { value: 'justified', text: 'Justified', svgIcon: './assets/media/inline-svg/editor/alignment-justify.svg' },
            { value: 'left1', text: 'Left2', svgIcon: './assets/media/inline-svg/editor/alignment-left.svg' },
            { value: 'center1', text: 'Center2', svgIcon: './assets/media/inline-svg/editor/alignment-center.svg' },
          ]
        }
        break;
      case FormOptionType.POSITION:
        options = {
          options: [
            { value: 'left', text: 'Left1', svgIcon: './assets/media/inline-svg/editor/alignment-left.svg' },
            { value: 'center', text: 'Center1', svgIcon: './assets/media/inline-svg/editor/alignment-center.svg' },
            { value: 'right', text: 'Right1', svgIcon: './assets/media/inline-svg/editor/alignment-right.svg' },
          ]
        }
        break;
      default:
        break;
    }
    return options;
  }
}