// Angular
import { FormControl } from '@angular/forms';

// Utils
import { DateUtil } from '../../utils/date';

export class NgbDateValidator {
  /**
    * Call this function to get the validator function for fromDate less than toDate
    * @static
    * @returns validator function
    */
  static greaterThanDateValidator(toDatekey: string): any {
    return (control: FormControl) => {
      // check values
      if (!control.value?.start || !control.parent?.get(toDatekey)?.value?.start) return null;

      if (DateUtil.localDateToMomentDate(control.value?.start).isBefore(DateUtil.localDateToMomentDate(control.parent.get(toDatekey)?.value?.start))) {
        return { greaterThanDateKey: true };
      }

      return null;
    };
  }


  /**
   * Call this function to get the validator function for ToDate greater than FromDate
   * @static
   * @returns validator function
   */
  static lessThanDateValidator(fromDateKey: string): any {
    return (control: FormControl) => {

      // check values
      if (!control.value?.start || !control.parent?.get(fromDateKey)?.value?.start) return null;

      if (DateUtil.localDateToMomentDate(control.parent.get(fromDateKey)?.value?.start).isBefore(DateUtil.localDateToMomentDate(control.value.start))) {
        return { lessThanDateKey: true };
      }

      return null;
    };
  }
}
