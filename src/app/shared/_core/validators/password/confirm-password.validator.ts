import { FormControl, ValidatorFn } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
  * @static Call this function to get the validator function for the confirm password validation
  * @param {string} key form control element key for match with current form control
  * @returns validator function
  */
  static confirmPassword(key: string): any {
    return (control: FormControl) => {
      // compare values with given form control
      if (control.value !== control.parent?.get(key)?.value) {
        return { confirmPassword: true };
      }

      return null;
    };
  }
}
