import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Interfaces
import { Field } from 'src/app/constants/models/controls/form/form-field-config';

// Enums
import { ControlType } from 'src/app/constants/enums/controls/form/form-control-type.enum';

/**
 * Common form validate class for handle form validation
 *
 * @author Pratik Shihora <pratik@saeculumsolutions.com>
 *
 * Notes:-
 * Date: 30/03/2020 (Pratik Shihora <pratik@saeculumsolutions.com>) form validation base class created
 */
@Component({ template: '' })
export abstract class FormValidateComponent implements OnInit {
  // form & fields setup
  form: FormGroup = new FormGroup({});
  formFields: Field[] | { [key: string]: Field } | any;
  options:any = {};
  values:any = {};

  loading = false;

  constructor() { }

  ngOnInit(): void {
  }

  labelCallback(options = null) {
    return options;
  }
  icoCallback(options = null) {
    return options;
  }
  valueCallback(value = null) {
    return value;
  }
  //#endregion

  //#region submit form 
  markAllAsTouched() {
    if (!this.formFields) { this.form.markAllAsTouched(); return false; }

    if (Array.isArray(this.formFields)) {
      (this.formFields as Field[]).forEach(field => {
        this.markAsTouch(field);
      })
      return false;
    }

    Object.keys(this.formFields as { [key: string]: Field }).forEach(field => {
      this.markAsTouch(this.formFields[field]);
    })
    return false;
  }

  markAsTouch(field: Field) {
    switch (field.type) {
      case ControlType.COMPONENT:
        this.form.controls[field.key] && this.form.controls[field.key].markAsTouched();
        break;
      case ControlType.ROW:
        field.fieldGroups?.forEach(subField => {
          this.form.controls[subField.key] && this.form.controls[subField.key].markAsTouched();
        });
        break;
      case ControlType.FORM_GROUP:
        const formGroup = <FormGroup>this.form.get(field.key);
        formGroup && Object.keys(formGroup.controls).forEach((control: string) => {
          (<FormControl>formGroup.get(control)).markAsTouched();
        })
        break;
      case ControlType.FORM_ARRAY:
        this.form.get(field.key)?.markAllAsTouched();
        break;
      default:
        break;
    }
    return false;
  }

  customValidateForm(formValue: any) {
    return true;
  }

  validateForm() {
    if (this.form.invalid) {
      this.markAllAsTouched();
      return false;
    }
    return this.customValidateForm(this.form.getRawValue());
  }

  //#endregion
}
