// ANGULAR
import { Pipe, PipeTransform } from '@angular/core';

// UTILS
import { DateUtil } from 'src/app/shared/_core/utils/date';

@Pipe({ name: 'TimezoneTime' })
export class TimezoneTime implements PipeTransform {

  /**
   * Transform the system datetime to time format to be shown in ui;
   * @param value
   */
  transform(value: string) {
    const transFormedDate = DateUtil.tranformToTimeFormat(value);
    if (transFormedDate === 'Invalid date') {
      return value;
    }

    return transFormedDate;
  }
}
