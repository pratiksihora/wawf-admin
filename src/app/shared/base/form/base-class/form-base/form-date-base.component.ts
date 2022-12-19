// ANGULAR
import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

// Components
import { FormBaseComponent } from './form-base.component';

// Utils
import { DateUtil } from 'src/app/_core/utils/date';

@Component({ template: '' })
export abstract class FormDateBaseComponent extends FormBaseComponent implements OnInit, OnDestroy {

  @Input() minDate: any = { year: 1800, month: 1, day: 1 };
  @Input() maxDate: any = { year: 3000, month: 1, day: 1 };

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

  _setupAfterControlIntialize() {
    if (!this.validators) return null;

    // set min date
    if (this.validators.minDate) {
      this.minDate = DateUtil.getCurrentLocalMomentDate(this.validators.minDate);
    }

    // set max date
    if (this.validators.maxDate) {
      this.maxDate = DateUtil.getCurrentLocalMomentDate(this.validators.maxDate);
    }

    // set max date as current date
    if (this.validators.noFutureDate) {
      this.maxDate = DateUtil.getCurrentLocalMomentDate();
    }

    // set min date as current date
    if (this.validators.noPastDate) {
      this.minDate = DateUtil.getCurrentLocalMomentDate();
    }
  }

  notifyChange(event: any) {
    if (!this.validators?.greaterThanDateKey && !this.validators?.lessThanDateKey) {
      this.valueChange.emit({ key: this.field.key, value: this.form.get(this.field.key)?.value, extraValue: event?.target?.value || event?.extraValue });
      return;
    }

    this._updateDateValidation(event);
    return;
  }

  _updateDateValidation(event?: any) {
    this.form.get(this.field.key)?.updateValueAndValidity();
    let key = this.validators.greaterThanDateKey ? this.validators.greaterThanDateKey : this.validators.lessThanDateKey;

    setTimeout(() => {
      if (key) {
        this.form.get(key)?.markAsTouched();
        this.form.get(key)?.updateValueAndValidity();
        this.cdr.detectChanges();
      }
      this.valueChange.emit({ key: this.field.key, value: this.form.get(this.field.key)?.value, extraValue: event?.target?.value });
    }, 1000);
  }

}