// ANGULAR
import { Component, OnDestroy, OnInit } from '@angular/core';

// Components
import { FormDateBaseComponent } from './form-date-base.component';

@Component({ template: '' })
export abstract class FormTimeBaseComponent extends FormDateBaseComponent implements OnInit, OnDestroy {

  _updateDateValidation(event?: any) {
    this.form.get(this.field.key)?.updateValueAndValidity();
    let key = this.validators.greaterThanTimeKey ? this.validators.greaterThanTimeKey : this.validators.lessThanTimeKey;

    setTimeout(() => {
      if (key) {
        this.form.get(key)?.markAsTouched();
        this.form.get(key)?.updateValueAndValidity();
      }
      this.valueChange.emit({ key: this.field.key, value: this.form.get(this.field.key)?.value, extraValue: event?.target?.value });
    }, 100);
  }

}