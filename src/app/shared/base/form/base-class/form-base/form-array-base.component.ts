import { Component, OnInit, SimpleChanges } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

// Components
import { FormBaseComponent } from "./form-base.component";

@Component({ template: '' })
export abstract class FormArrayBaseComponent extends FormBaseComponent implements OnInit {

  /**
  * Initially add control
  */
  _addFormControl() {
    const formGroups = (this.values || []).map(() => new FormGroup({}));
    this.form.addControl(this.field.key, new FormArray(formGroups));
    this.form.addControl(`${this.field.key}_hidden`, new FormControl(this.hidden.value));
  }

  /**
   * Called when input properties of the component got changed
   * @param {SimpleChanges} changes contains the previous value and changed value
   */
  ngOnChanges(changes: SimpleChanges) {
    if (this.field && this.field && changes.values?.currentValue !== undefined && this.form?.get(this.field.key)) {
      this._reFillArray();
    }

    if (changes.fieldConfig?.currentValue !== undefined || changes.formConfig?.currentValue !== undefined) {
      this._configureField();
    }
  }

  /**
  * refill array on change values 
  */
  _reFillArray() {
    this._clearFormArray();
    (this.values || []).map(() => this.getFormArray().push(new FormGroup({})));
  }

  /**
  * Add Item in form array
  */
  addNewItem() {
    this.getFormArray().push(new FormGroup({}));
    this.cdr?.detectChanges();
  }

  /**
   * Delete item from formarray
   */
  deleteItem(index: number) {
    // confirm not available direct delete item
    if (!this.field.formArrayOptions?.deleteConfirm) { this.getFormArray().removeAt(index); return; }

    // confirm 
    // this.notification.showNotification(this.field?.templateOptions?.confirmationOptions || DeleteModalConstant, () => {
    //   this.getFormArray().removeAt(index);
    //   this.cdr.detectChanges();
    // })
  }
}