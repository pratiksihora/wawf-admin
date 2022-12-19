import { Validators } from '@angular/forms';
import { ComponentType } from 'src/app/shared/constants/enums/controls/form/form-component-type.enum';
import { InputControlType } from 'src/app/shared/constants/enums/controls/form/form-input-control-type.enum';

// Interfaces
import { ValidatorOption } from 'src/app/shared/constants/models/controls/form/form-field-config';

// Custom Validators
import { CheckBoxValidator } from '../../validators/checkbox/checkbox.validator';
import { NgbDateTimeValidator } from '../../validators/date/date-time.validator';
import { NgbDateValidator } from '../../validators/date/date.validator';
import { EmailValidator } from '../../validators/multi-email/multi-email.validator';
import { NumberValidator } from '../../validators/number/number.validator';
import { ConfirmPasswordValidator } from '../../validators/password/confirm-password.validator';

export class FormUtil {
  /**
    * Get all fields validations
    */
  static getValidations(validators: ValidatorOption | any, subType?: InputControlType, componentType?: ComponentType) {
    // check if validation not exists
    if (!validators) { validators = {} };

    const validations = [];

    if (validators.required) {
      validations.push(Validators.required);
      validations.push(Validators.pattern(new RegExp('\\S')));
    }

    if (validators.minLength) {
      validations.push(Validators.minLength(validators.minLength));
    }

    if (validators.maxLength) {
      validations.push(Validators.maxLength(validators.maxLength));
    }

    if (validators.min || validators.min === 0) {
      validations.push(Validators.min(validators.min));
    }

    if (validators.max) {
      validations.push(Validators.max(validators.max));
    }

    if (validators.pattern) {
      validations.push(Validators.pattern(validators.pattern));
    }

    if (validators.multiEmail) {
      validations.push(EmailValidator.multiEmailValidator());
    }

    if (validators.minSelection) {
      validations.push(CheckBoxValidator.minSelectionAllowed(validators.minSelection));
    }

    if (validators.maxSelection) {
      validations.push(CheckBoxValidator.maxSelectionAllowed(validators.maxSelection));
    }

    if (validators.reqSelection) {
      validations.push(CheckBoxValidator.checkboxRequired);
    }

    if (validators.confirmPassword) {
      validations.push(ConfirmPasswordValidator.confirmPassword(validators.confirmPassword));
    }

    if (validators.greaterThanDateKey) {
      componentType === ComponentType.DATE_PICKER ?
        validations.push(NgbDateValidator.greaterThanDateValidator(validators.greaterThanDateKey))
        : validations.push(NgbDateTimeValidator.greaterThanDateValidator(validators.greaterThanDateKey))
    }

    if (validators.lessThanDateKey) {
      componentType === ComponentType.DATE_PICKER ?
        validations.push(NgbDateValidator.lessThanDateValidator(validators.lessThanDateKey))
        : validations.push(NgbDateTimeValidator.lessThanDateValidator(validators.lessThanDateKey))
    }

    if (validators.greaterThanNumberKey) {
      validations.push(NumberValidator.greaterThanNumberValidator(validators.greaterThanNumberKey));
    }

    if (validators.lessThanNumberKey) {
      validations.push(NumberValidator.lessThanNumberValidator(validators.lessThanNumberKey));
    }

    if (subType === InputControlType.URL && !validators.pattern) {
      validations.push(Validators.pattern('https?:\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'));
    }

    if (subType === InputControlType.EMAIL && !validators.pattern) {
      validations.push(Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]+[a-zA-x]{2,15}$'));
    }

    return validations;
  }

  static convertToSlug(val: string) {
    if (!val) return '';
    let text = val.toLowerCase();
    if (text.charAt(0) == " ") {
      text = text.trim();
    }
    if (text.charAt(text.length - 1) == "-") {
      text = (text.replace(/-/g, ""));
    }
    text = text.replace(/ +/g, "-");
    text = text.replace(/--/g, "-");
    text = text.normalize("NFKD").replace(/[\u0300-\u036f]/g, ""); // Note: Normalize('NFKD') used to normalize special alphabets like óã to oa
    text = text.replace(/[^a-zA-Z0-9 -]/g, "");
    return text;
  }
  //#endregion
}