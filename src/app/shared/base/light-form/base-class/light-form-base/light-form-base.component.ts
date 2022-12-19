import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

// Extrenal dependency
import { Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

// Interfaces and Enums
import { ErrorMessage, Field, FieldWatcher, FormGlobalConfig, Icon, ValidatorOption } from "src/app/constants/models/controls/form/form-field-config";
import { HideDisableType } from "src/app/constants/enums/controls/form/form-hide-disable-type.enum";
import { LayoutType } from "src/app/constants/enums/controls/form/form-layout-type.enum";

// Utils
import { FormUtil } from "src/app/_core/utils/form";

/**
 * Common form class for handle form control options and methods
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 03/03/2022 (Pratik Shihora <pratik@saeculumsolutions.com>) form base class created
 */
@Component({ template: '' })
export abstract class LightFormBaseComponent implements OnInit, OnDestroy {
  /**
   * External inputs
   */
  @Input() options: any;
  @Input() prefix: any;
  @Input() values: any;
  @Input() parentForm: FormGroup;
  @Input() form: FormGroup;
  @Input() fieldConfig: Field;
  @Input() formConfig: FormGlobalConfig;
  /**
   * External outputs
   */
  @Output() valueChange = new EventEmitter<any>();
  @Output() iconAction = new EventEmitter<any>();
  @Output() labelAction = new EventEmitter<any>();
  @Output() detectAction = new EventEmitter<any>();

  field: Field;
  hidden: any = {
    default: false,
    expression: false,
    value: false,
  };

  disabled: any = {
    default: false,
    expression: false,
    value: false,
  };

  readonly = false;
  view = false;

  validators: ValidatorOption | any;
  messages: ErrorMessage | any;
  layoutEnum = LayoutType;
  id = this.generateRandom();
  subId = this.generateRandom();

  /**
   * Subscriptions handle on destroy
   */
  subscriptions: Subscription[] = [];

  constructor(protected cdr?: ChangeDetectorRef, protected translate?: TranslateService) {
  }

  /**
  * @returns All the form array related things
  */
  getFormArray() {
    return (this.form.get(this.field.key) as FormArray);
  }


  generateRandom() {
    return `control_${Math.floor(100000 + Math.random() * 900000)}`
  }

  ngOnInit() {
    this._configureField();
    this._setupFormControl();
  }

  /**
   * Called when input properties of the component got changed
   * @param {SimpleChanges} changes contains the previous value and changed value
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.field && changes.values?.currentValue !== undefined && this.form?.get(this.field.key)) {
      this.form.get(this.field.key)?.patchValue(changes.values.currentValue);
    }

    if (changes.fieldConfig?.currentValue !== undefined || changes.formConfig?.currentValue !== undefined) {
      this._configureField();
    }
  }

  /**
  * Create a field config object from form and field config.
  * Note: We have given higher priority to field config params over form config params
  * @param formConfig : Contains global form config params
  * @param field : Contains field config param
  * @returns
  */
  _configureField() {
    if (!this.fieldConfig) {
      return;
    }
    this.field = {
      ...this.fieldConfig,
      classNames: {
        ...this.formConfig?.classNames,
        ...this.fieldConfig?.classNames
      },
      templateOptions: {
        ...this.formConfig?.templateOptions,
        ...this.fieldConfig?.templateOptions
      }
    }
  }

  /**
   * Emits the changed value when value changes
   * @param {{ target: { value: any; }; }} event (contains changed value)
   */
  notifyChange(event: any) {
    this.valueChange.emit({ key: this.field.key, value: this.form.get(this.field.key)?.value, extraValue: event?.target?.value });
    this._resetDependentFields();
  }

  _setupFormControl() {
    this._intialShowExpression();
    this._intialEnableExpression();
    this._fillOptions();
    this._addFormControl();
    this._startWatcher();
    this._setupAfterControlIntialize();
    this._detectHidden();
  }

  _addFormControl() {
    const defaultValue = this.field.defaultValue !== undefined ? this.field.defaultValue : null;
    // add form control with if default disabled needed
    this.form.addControl(this.field.key, new FormControl({
      value: this.values || defaultValue,
      disabled: this.disabled.value
    }));
    this.form.addControl(`${this.field.key}_hidden`, new FormControl(this.hidden?.value));
  }

  _fillOptions() {

  }

  _setupAfterControlIntialize() {

  }

  _detectHidden() {
    if (this.hidden.value) {
      this.form.get(`${this.field.key}_hidden`)?.updateValueAndValidity();
      this.detectAction.emit({});
    }
  }

  _setHiddenValues(type: HideDisableType, value: boolean) {
    if (type === HideDisableType.DEFAULT) {
      this.hidden.default = value;
    } else if (type === HideDisableType.EXPRESSION) {
      this.hidden.expression = value;
    }
    this.hidden.value = this.hidden.default || this.hidden.expression || this.field.hidden;
    this.form.get(`${this.field.key}_hidden`).patchValue(this.hidden.value);
    this.detectAction.emit({});
    this.cdr?.detectChanges();
  }

  _intialShowExpression() {
    if (this.field.hidden) {
      this._setHiddenValues(HideDisableType.DEFAULT, this.field.hidden);
      return;
    }
  }

  _setDisabledValues(type: HideDisableType, value: boolean) {
    if (type === HideDisableType.DEFAULT) {
      this.disabled.default = value;
    } else if (type === HideDisableType.EXPRESSION) {
      this.disabled.expression = value;
    }
    this.disabled.value = this.disabled.default || this.disabled.expression || this.field.disabled || this.field.readonly;
  }

  _intialEnableExpression() {
    if (this.field.disabled || this.field.readonly) {
      this._setDisabledValues(HideDisableType.DEFAULT, true);
      return;
    }
  }

  /**
 * Clear validations if enable expressions  is not valid
 */
  private _enableDisableValidations(enabled: boolean, resetValue = false) {
    if (enabled) {
      this.form.controls[this.field.key].enable();
    } else {
      this.form.controls[this.field.key].disable();
      this._clearValidations(this.form, this.field, resetValue);
    }
    setTimeout(() => {
      this.cdr?.detectChanges();
    }, 200);
  }

  /**
* Clear Validators
*/
  private _clearValidations(form: FormGroup, field: Field, reset = false) {
    this.messages = undefined;
    this.validators = undefined;
    if (reset) {
      form.controls[field.key].patchValue(this.field.templateOptions?.multiple ? [] : null);
    };
    form.controls[field.key].setErrors(null);
    form.controls[field.key].clearValidators();
    form.controls[field.key].updateValueAndValidity();
  }


  /**
    * reset other controls on change of 
    */
  _resetDependentFields() {
    if (this.field.resetDependentFields) {
      this.field.resetDependentFields.forEach(a => {
        this.form.get(a)?.patchValue(this.field.templateOptions?.multiple ? [] : null);
      });
      setTimeout(() => {
        this.detectAction.emit({ field: this.field })
      }, 1000)
    }
  }

  /**
    * Visible Expression for condition form controls
    */
  private _startWatcher() {
    if (this.hidden.default || this.disabled.default) return;

    if (!this.field.expression) { this._setDefaultValidations(); return; };

    if (this.field.expression?.watcher) {
      this.field.expression?.watcher.forEach(field => {
        const form = field.parentForm ? this.parentForm : this.form;
        this.subscriptions.push(form.controls[field.key]?.valueChanges.pipe(
          debounceTime(100),
          distinctUntilChanged()
        ).subscribe(val => {
          this._checkExpressions(field);
        }));
      });
    }

    // default check for expressions
    this._checkExpressions();
  }

  /**
 * Visible Expression for condition form controls
 */
  private _checkExpressions(field?: FieldWatcher) {
    if ((field?.show && this.field.expression?.show) || (!field && this.field.expression?.watcher?.some(a => a.show) && this.field.expression?.show)) {
      let show = this.field.expression?.show({ form: this.form, parentForm: this.parentForm, field: this.field })
      this._setHiddenValues(HideDisableType.EXPRESSION, !show);
      this._clearValidations(this.form, this.field);
      if (!show) return;
    }

    if ((field?.enable && this.field.expression?.enable) || (!field && this.field.expression?.watcher?.some(a => a.enable) && this.field.expression?.enable)) {
      let enable = this.field.expression?.enable({ form: this.form, parentForm: this.parentForm, field: this.field })
      this._setDisabledValues(HideDisableType.EXPRESSION, enable);
      this._enableDisableValidations(enable, false);
      if (!enable) return;
    }

    // // conditional validations
    this._checkValidations(field);
  }

  private _checkValidations(field?: FieldWatcher) {
    if (field?.validation || (!field && this.field?.expression?.validation && this.field.expression?.watcher?.some(a => a.validation))) {
      let validation = this.field.expression?.validation({ form: this.form, parentForm: this.parentForm, field: this.field })
      if (validation) {
        this.setValidations(this.form, this.field, validation.validators, validation.messages);
        return;
      };

      if (this.field.expression?.clearValidationIfNotMatch) {
        this._clearValidations(this.form, this.field);
        return;
      }
    }
    // set default validations
    this._setDefaultValidations();
  }

  // set default validations
  _setDefaultValidations() {
    this.setValidations(this.form, this.field, this.field.validations?.validators, this.field.validations?.messages);
  }

  /**
  * Set validations base on config
  */
  setValidations(form: FormGroup, field: Field, validators?: ValidatorOption, messages?: ErrorMessage) {
    const validations = FormUtil.getValidations(validators, this.field.subType);
    this.validators = validators;
    this.messages = messages;
    const control = form.controls[field.key];
    control.setErrors(null);
    control.setValidators(validations);
    control.updateValueAndValidity();
  }

  /**
  * Set custom error on form control
  */
  _setErrors(error: string) {
    this.form.controls[this.field.key].setErrors(error ? { error } : null);
  }

  /**
   * Called when input properties of the component got changed
   * @param {object} icon contains icon setting
   */
  iconClick(icon?: Icon) {
    this.iconAction.emit({ icon, field: this.field });
  }

  /**
   * unsubscribe all active subscriptions get destroyed
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }
}