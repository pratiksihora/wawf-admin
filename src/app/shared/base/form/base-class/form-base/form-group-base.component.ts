import { Component, OnInit, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

// Components
import { FormBaseComponent } from "./form-base.component";

@Component({ template: '' })
export abstract class FormGroupBaseComponent extends FormBaseComponent implements OnInit {
  /**
   * Initially add control
   */
  _addFormControl() {
    this.form.addControl(this.field.key, new FormGroup({}));
    this.form.addControl(`${this.field.key}_hidden`, new FormControl(this.hidden?.value));
  }

  /**
   * Called when input properties of the component got changed
   * @param {SimpleChanges} changes contains the previous value and changed value
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.field && changes.values?.currentValue !== undefined && this.form?.get(this.field.key)) {
      this._resetFormGroup();
    }

    if (changes.fieldConfig?.currentValue !== undefined || changes.formConfig?.currentValue !== undefined) {
      this._configureField();
    }
  }

  /**
   * Reset form group on change values 
   */
  _resetFormGroup() {
    this.form.get(this.field.key)?.reset();
  }
}