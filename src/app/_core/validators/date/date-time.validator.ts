// Angular
import { FormControl } from '@angular/forms';

// Utils
import { DateUtil } from '../../utils/date';

export class NgbDateTimeValidator {
  /**
    * Call this function to get the validator function for fromDate less than toDate
    * @static
    * @returns validator function
    */
  static greaterThanDateValidator(toDatekey: string): any {
    return (control: FormControl) => {
      // check values
      if (!control.value?.start || !control.parent?.get(toDatekey)?.value?.start) return null;

      if (DateUtil.localDateTimeToMomentDate(control.value?.start).isAfter(DateUtil.localDateTimeToMomentDate(control.parent?.get(toDatekey)?.value?.start))) {
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

      if (DateUtil.localDateTimeToMomentDate(control.parent?.get(fromDateKey)?.value?.start).isAfter(DateUtil.localDateTimeToMomentDate(control.value?.start))) {
        return { lessThanDateKey: true };
      }

      return null;
    };
  }
}
