import { FormArray, FormControl, ValidatorFn } from '@angular/forms';

export class CheckBoxValidator {
  /**
   * @static check max selection of checkbox with allowed max values
   * @param {number} maxSelection max items that can be checked
   * @returns validator function
   */
  static maxSelectionAllowed(maxSelection: number): any {
    return (formControl: FormArray) => {
      // return null no control or valur exists
      if (!formControl || !formControl.value || !formControl.value.length) return null;

      // validate if selection more than max
      if (formControl.value.filter((item: any) => item.selected).length > maxSelection)
        return { maxSelection: true };

      return null;
    };
  }

  /**
   * @static check min selection of checkbox with allowed min values
   * @param {number} minSelection min items that can be checked
   * @returns validator function
   */
  static minSelectionAllowed(minSelection: number): any {
    return (formControl: FormArray): any => {
      // return null no control or valur exists
      if (!formControl || !formControl.value || !formControl.value.length) return { min_selection: true };;

      // validate if selection less than min
      if (formControl.value.filter((item: { selected: any; }) => item.selected).length < minSelection)
        return { minSelection: true };

      return null;
    };
  }

  /**
   * @static For single checkbox if the selection is required
   * @param {FormControl} formControl
   * @returns error if the checkbox is not checked
   */
  static checkboxRequired(formControl: FormControl) {
    if (!formControl.value || formControl.value.toString().toLowerCase() === 'false') {
      return { reqSelection: true };
    }

    return null;
  }
}
