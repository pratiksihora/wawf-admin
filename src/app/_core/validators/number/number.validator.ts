// Angular
import { FormControl, ValidatorFn } from '@angular/forms';

// Utils

export class NumberValidator {
  /**
    * Call this function to get the validator function for fromNumber less than toNumber
    * @static
    * @returns validator function
    */
  static greaterThanNumberValidator(toNumberkey: string): any {
    return (control: FormControl) => {
      // check values
      if (!control.value || !control.parent?.get(toNumberkey)?.value) return null;

      if (parseFloat(control.value) > parseFloat(control.parent.get(toNumberkey)?.value)) {
        return { greaterThanNumberKey: true };
      }

      return null;
    };
  }


  /**
   * Call this function to get the validator function for ToNumber greater than FromNumber
   * @static
   * @returns validator function
   */
  static lessThanNumberValidator(fromNumberKey: string): any {
    return (control: FormControl) => {

      // check values
      if (!control.value || !control.parent?.get(fromNumberKey)?.value) return null;

      if (parseFloat(control.value) < parseFloat(control.parent.get(fromNumberKey)?.value)) {
        return { lessThanNumberKey: true };
      }

      return null;
    };
  }
}
