import { FormControl, ValidatorFn } from '@angular/forms';

export class EmailValidator {
  /**
   * @static Call this function to get the validator function for the multiple email validation
   * @returns validator function
   */
  static multiEmailValidator(): any {

    return (control: FormControl) => {
      if (!control.value || !control.value.length) return null;

      if (!control.value.every((email: any) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(email)))
        return { multi_email: true };

      return null;
    };
  }
}
