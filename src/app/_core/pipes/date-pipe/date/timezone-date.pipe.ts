// ANGULAR
import { Pipe, PipeTransform } from '@angular/core';

// UTILS
import { DateUtil } from 'src/app/_core/utils/date';

@Pipe({ name: 'TimezoneDate' })
export class TimezoneDate implements PipeTransform {

  /**
   * Transform the system date to date format to be shown in ui;
   * @param value
   */
  transform(value: string) {
    const transFormedDate = DateUtil.tranformToDateFormat(value);
    if (transFormedDate === 'Invalid date') {
      return value;
    }

    return transFormedDate;
  }
}
