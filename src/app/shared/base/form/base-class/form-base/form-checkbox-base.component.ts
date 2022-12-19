import { Component, OnInit, SimpleChanges } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";

// Components
import { FormOptionBaseComponent } from "./form-option-base.component";

// Utils
import { CheckboxOptionUtil } from "src/app/shared/_core/utils/form/checkbox";

@Component({ template: '' })

export abstract class FormCheckboxBaseComponent extends FormOptionBaseComponent implements OnInit {

  _addFormControl() {
    this.form.addControl(this.field.key, new FormArray([]));
    this.form.addControl(`${this.field.key}_hidden`, new FormControl(this.hidden?.value));
  }

  _setupAfterControlIntialize() {
    this._reFillOptions()
  }

  /**
   * Called when input properties of the component got changed
   * @param {SimpleChanges} changes contains the previous value and changed value
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.field && changes.values?.currentValue !== undefined && this.form?.get(this.field.key)) {
      this._reFillOptions();
    }

    if (changes.fieldConfig?.currentValue !== undefined || changes.formConfig?.currentValue !== undefined) {
      this._configureField();
    }
  }

  _initialFilter(): void {
    // ignore for 
  }

  async _reFillOptions() {
    this._clearFormArray();
    const options = await this._fillOptions();
    (options || []).forEach((option: any) => this.getFormArray().push(CheckboxOptionUtil.initCheckbox(option)));
    this.cdr.detectChanges();
  }
}