// EXTERNAL DEPENDENCY
import * as  momentTimeZone from 'moment-timezone';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

// UTILS
import { StorageUtil } from '../storage';

export class DateUtil {
  //#region set time zone
  /**
    * Set timezone at time of load
    * @param timeZone
    */
  static setDefaultTimeZone(timeZone = null) {
    momentTimeZone.tz.setDefault(timeZone || StorageUtil.getTimeZone());
  }
  //#endregion

  //#region date get & set
  /**
   * To Convert Timezone to date
   * @param date
   * @returns {string} ngb date format in string
   */
  static systemDateToDatePicker(date: any | null) {
    if (!date) return null;
    date = date.replace('.000Z', '')
    let value = momentTimeZone(date, StorageUtil.getSystemFormat())
    return { start: value, end: value };
  }

  /**
   * To convert the ngbdate to timezone date
   * @param value
   * @returns {string} payload date time format in string
   */
  static localDateToSystemDate(value: any, endTimeNeeded: boolean = false) {
    let date = momentTimeZone(value?.start).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    // if end time needed
    if (endTimeNeeded) {
      date = date.add(1, 'day').subtract(1, 'second');
    }
    return date.format(StorageUtil.getSystemFormat()) + 'Z';
  }
  //#endregion

  //#region date & time get & set

  /**
   * To convert the ngbdate to timezone date
   * @param value
   * @returns {string} payload date time format in string
   */
  static systemDateTimeToDateTimePicker(date: any | null) {
    if (!date) return null;
    date = date.replace('.000Z', '')
    let value = momentTimeZone(date, StorageUtil.getSystemFormat())
    return { start: value, end: value };
  }

  /**
   * To convert the ngbdate to timezone date
   * @param value
   * @returns {string} payload date time format in string
   */
  static localDateTimeToSystemDateTime(value: any) {
    let date = momentTimeZone(value?.start);
    return date.format(StorageUtil.getSystemFormat()) + 'Z';
  }

  //#endregion

  //#region date & range get & set

  /**
   * To convert the ngbdate to timezone date
   * @param value
   * @returns {string} payload date time format in string
   */
  static systemDateRangeToDateRangePicker(date1: any | null, date2: any) {
    if (!date1 && !date2) return null;
    date1 = date1?.replace('.000Z', '');
    date2 = date2?.replace('.000Z', '');

    let value1 = momentTimeZone(date1, StorageUtil.getSystemFormat());
    let value2 = momentTimeZone(date1, StorageUtil.getSystemFormat());

    return { start: value1, end: value2 };
  }

  /**
   * To convert the ngbdate to timezone date
   * @param value
   * @returns {string} payload date time format in string
   */
  static dateRangePickerToSystemDateRange(value: any, endTimeNeeded: boolean = false) {
    if (!value.start && !value.end) return null;
    let value1 = momentTimeZone(value.start, StorageUtil.getSystemFormat()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    let value2 = momentTimeZone(value.end, StorageUtil.getSystemFormat()).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    // if end time needed
    if (endTimeNeeded) {
      value2 = value2.add(1, 'day').subtract(1, 'second');
    }
    return { start: value1, end: value2 };
  }

  //#endregion

  //#region filter section
  /**
   * To convert utc date to timezone date with time
   * @param {string} value
   * @returns {object} object of start date and end date
   */
  static localDateToDateTimeFilters(value: NgbDate) {
    const startDate = momentTimeZone(value).format(StorageUtil.getSystemFormat());
    const endDate = momentTimeZone(value).add(1, 'days').subtract(1, 'second').format(StorageUtil.getSystemFormat());
    return { startDate, endDate };
  }

  static dateToDateTimeFilters(value: string) {
    const startDate = momentTimeZone(value).format(StorageUtil.getSystemFormat());
    const endDate = momentTimeZone(value).add(1, 'days').subtract(1, 'second').format(StorageUtil.getSystemFormat());
    return { startDate, endDate };
  }
  //#endregion

  //#region moment converter
  /**
   * To convert date time to moment date
   * @param {string} value
   * @returns {moment} date format in string
   */
  static tranformToMomentDate(value: string | null) {
    if (!value) return null;
    return momentTimeZone(value, StorageUtil.getSystemFormat());
  }

  /**
   * To convert timezone date time to time format pipe
   * @param {string} value
   * @returns {string} date time format in string
   */
  static tranformToDateFormat(value: string | null) {
    return value ? momentTimeZone(value, StorageUtil.getSystemFormat()).format(StorageUtil.getDateFormat()) : '';
  }

  /**
   * To convert timezone date time to time format pipe
   * @param {string} value
   * @returns {string} date time format in string
   */
  static tranformToDateTimeFormat(value: string | null) {
    return value ? momentTimeZone(value, StorageUtil.getSystemFormat()).format(StorageUtil.getDateTimeFormat()) : '';
  }

  /**
   * To convert timezone date time to time format pipe
   * @param {string} value
   * @returns {string} time format in string
   */
  static tranformToTimeFormat(value: string | null) {
    return value ? momentTimeZone(value, StorageUtil.getSystemFormat()).format(StorageUtil.getTimeFormat()) : '';
  }

  /**
   * To convert the ngbdate to date format
   * @param value
   * @returns {string} payload date time format in string
   */
  static localDateToMomentDate(value: any) {
    if (!value) return momentTimeZone();
    return momentTimeZone(value, StorageUtil.getDateFormat());
  }

  /**
 * To convert the ngbdate to date format
 * @param value
 * @returns {string} payload date time format in string
 */
  static localDateTimeToMomentDate(value: any) {
    if (!value) return momentTimeZone();
    return momentTimeZone(value, StorageUtil.getDateTimeFormat());
  }


  /**
* Get current ngb date
* @returns {object} date format in year, month, day
*/
  static getCurrentLocalMomentDate(value = null) {
    let momentDate = momentTimeZone();
    if (value) {
      momentDate = momentTimeZone(value, StorageUtil.getSystemFormat())
    }
    return momentDate;
  }
  //#endregion
}