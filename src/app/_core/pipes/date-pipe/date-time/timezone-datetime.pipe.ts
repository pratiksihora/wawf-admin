// Angular
import { Pipe, PipeTransform } from '@angular/core';

// Utils
import { DateUtil } from 'src/app/_core/utils/date';

@Pipe({ name: 'TimezoneDateTime' })
export class TimezoneDateTime implements PipeTransform {
  /**
   * Transform the syatem date time to date time format to be shown in ui;
   * @param value
   */
  transform(value: string) {
    const transFormedDate = DateUtil.tranformToDateTimeFormat(value);
    if (transFormedDate === 'Invalid date') {
      return value;
    }
    return transFormedDate;
  }
}
